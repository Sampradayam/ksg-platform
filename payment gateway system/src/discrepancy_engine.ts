import { Pool } from 'pg';
import { DiscrepancyReport, DiscrepancyType, PaymentStatus } from './types';

export class DiscrepancyEngine {
    private db: Pool;

    constructor(dbPool: Pool) {
        this.db = dbPool;
    }

    /**
     * Run all discrepancy checks and return combined report.
     * @param lookbackMinutes - How far back to check (default 60 mins)
     */
    async runChecks(lookbackMinutes: number = 60): Promise<DiscrepancyReport[]> {
        const reports: DiscrepancyReport[] = [];

        const missingWebhooks = await this.checkMissingWebhooks(lookbackMinutes);
        const statusMismatches = await this.checkStatusMismatches();

        return [...reports, ...missingWebhooks, ...statusMismatches];
    }

    /**
     * Check 1: Payments initiated > X mins ago but no webhook received.
     */
    private async checkMissingWebhooks(lookbackMinutes: number): Promise<DiscrepancyReport[]> {
        const query = `
      SELECT p.id, p.created_at, p.status
      FROM payments p
      WHERE p.status = 'INITIATED'
        AND p.created_at < NOW() - INTERVAL '${lookbackMinutes} MINUTES'
        AND NOT EXISTS (
          SELECT 1 FROM webhook_events w
          WHERE w.payment_id = p.id
        )
    `;

        const res = await this.db.query(query);

        return res.rows.map(row => ({
            type: DiscrepancyType.MISSING_WEBHOOK,
            payment_id: row.id,
            description: `Payment initiated at ${row.created_at} but no webhook received after ${lookbackMinutes} minutes.`,
            details: {
                current_status: row.status,
                initiated_at: row.created_at
            },
            detected_at: new Date()
        }));
    }

    /**
     * Check 2: Status Mismatch - Internal status represents failure but webhook says success.
     * (Simplification: checks if latest webhook is SUCCESS but payment is FAILED)
     */
    private async checkStatusMismatches(): Promise<DiscrepancyReport[]> {
        const query = `
      SELECT p.id as payment_id, p.status as internal_status, w.status as webhook_status, w.received_at
      FROM payments p
      JOIN webhook_events w ON p.id = w.payment_id
      WHERE p.status = 'FAILED' AND w.status = 'SUCCESS'
      AND w.received_at = (
          SELECT MAX(received_at) FROM webhook_events w2 WHERE w2.payment_id = p.id
      )
    `;

        const res = await this.db.query(query);

        return res.rows.map(row => ({
            type: DiscrepancyType.STATUS_MISMATCH,
            payment_id: row.payment_id,
            description: `Internal status FAILED but latest webhook reports SUCCESS.`,
            details: {
                internal: row.internal_status,
                external: row.webhook_status,
                webhook_time: row.received_at
            },
            detected_at: new Date()
        }));
    }
}
