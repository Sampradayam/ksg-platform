import { Pool } from 'pg';
import { Payment, PaymentFilter, PaginatedResult } from './types';

export class AdminService {
    private db: Pool;

    constructor(dbPool: Pool) {
        this.db = dbPool;
    }

    /**
     * List payments with filtering and pagination.
     */
    async listPayments(filter: PaymentFilter): Promise<PaginatedResult<Payment>> {
        const { start_date, end_date, status, min_amount, max_amount, page = 1, limit = 20 } = filter;
        const offset = (page - 1) * limit;

        const conditions: string[] = ['created_at BETWEEN $1 AND $2'];
        const params: any[] = [start_date, end_date];
        let paramIdx = 3;

        if (status && status.length > 0) {
            conditions.push(`status = ANY($${paramIdx})`);
            params.push(status);
            paramIdx++;
        }

        if (min_amount !== undefined) {
            conditions.push(`amount >= $${paramIdx}`);
            params.push(min_amount);
            paramIdx++;
        }

        if (max_amount !== undefined) {
            conditions.push(`amount <= $${paramIdx}`);
            params.push(max_amount);
            paramIdx++;
        }

        const whereClause = `WHERE ${conditions.join(' AND ')}`;

        // Count total matches for pagination metadata
        const countQuery = `SELECT COUNT(*) as total FROM payments ${whereClause}`;
        const countRes = await this.db.query(countQuery, params);
        const total = parseInt(countRes.rows[0].total, 10);

        // Fetch data
        const query = `
      SELECT * FROM payments 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT $${paramIdx} OFFSET $${paramIdx + 1}
    `;

        const dataRes = await this.db.query(query, [...params, limit, offset]);

        return {
            data: dataRes.rows,
            meta: {
                total,
                page,
                limit
            }
        };
    }

    /**
     * Helper to retrieve database pool for other services
     */
    getDb(): Pool {
        return this.db;
    }
}
