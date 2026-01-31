import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import { AdminService } from './admin_service';
import { DiscrepancyEngine } from './discrepancy_engine';

export const createAdminRouter = (db: Pool) => {
    const router = express.Router();
    const adminService = new AdminService(db);
    const discrepancyEngine = new DiscrepancyEngine(db);

    // Middleware to ensure admin access (Mock implementation)
    const requireAdmin = (req: Request, res: Response, next: Function) => {
        const authHeader = req.headers.authorization;
        if (authHeader === 'Bearer admin-token') {
            next();
        } else {
            res.status(403).json({ error: 'Forbidden: Admin access only' });
        }
    };

    router.use(requireAdmin);

    // GET /payments - List payments
    router.get('/payments', async (req: Request, res: Response) => {
        try {
            const { start_date, end_date, status, min, max, page, limit } = req.query;

            if (!start_date || !end_date) {
                res.status(400).json({ error: 'start_date and end_date are required' });
                return;
            }

            const result = await adminService.listPayments({
                start_date: start_date as string,
                end_date: end_date as string,
                status: status ? (status as string).split(',') as any : undefined,
                min_amount: min ? Number(min) : undefined,
                max_amount: max ? Number(max) : undefined,
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 20
            });

            res.json(result);
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    });

    // GET /reports/discrepancies - Run discrepancy checks
    router.get('/reports/discrepancies', async (req: Request, res: Response) => {
        try {
            const { lookback } = req.query;
            const lookbackMinutes = lookback ? Number(lookback) : 60;

            const discrepancies = await discrepancyEngine.runChecks(lookbackMinutes);

            res.json({
                generated_at: new Date(),
                count: discrepancies.length,
                discrepancies
            });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
};
