
// Mocking pg Pool and Client constraints for testing
class MockPool {
    query(text: string, params: any[] = []): Promise<any> {
        console.log(`[DB Query]: ${text.trim().replace(/\s+/g, ' ')}`);
        console.log(`[DB Params]: ${JSON.stringify(params)}`);

        // Mock responses based on query content
        if (text.includes('COUNT(*)')) {
            return Promise.resolve({ rows: [{ total: '5' }] });
        }

        // Mock Payment Listing
        if (text.includes('SELECT * FROM payments')) {
            return Promise.resolve({
                rows: [
                    { id: 'p_1', amount: 100, status: 'SUCCESS', created_at: new Date() },
                    { id: 'p_2', amount: 50, status: 'FAILED', created_at: new Date() }
                ]
            });
        }

        // Mock Discrepancy: Missing Webhook
        // Query checks for INITIATED & NOT EXISTS webhook
        if (text.includes("p.status = 'INITIATED'") && text.includes("NOT EXISTS")) {
            return Promise.resolve({
                rows: [
                    { id: 'p_stuck', created_at: new Date(Date.now() - 7200000), status: 'INITIATED' } // 2 hours ago
                ]
            });
        }

        // Mock Discrepancy: Status Mismatch
        if (text.includes("p.status = 'FAILED'") && text.includes("w.status = 'SUCCESS'")) {
            return Promise.resolve({
                rows: [
                    { payment_id: 'p_mismatch', internal_status: 'FAILED', webhook_status: 'SUCCESS', received_at: new Date() }
                ]
            });
        }

        return Promise.resolve({ rows: [] });
    }
}

// Import logic (simulated by requiring the files we just wrote, but here we import classes directly if running in proper env. 
// For this script to run standalone without build step, we will use the classes if they were here, but we can't easily import 'src/...' in a script without ts-node setup.
// So I will basically dry-run the logic invocation if I can, OR I assume the user will look at the code.
// Given strict "debug" request, I'll instantiate the classes assuming a build environment or just demonstrate usage.)

import { AdminService } from './admin_service';
import { DiscrepancyEngine } from './discrepancy_engine';

async function runTest() {
    console.log('--- Starting Admin Reporting Verification ---');

    const mockDb = new MockPool() as any;
    const adminService = new AdminService(mockDb);
    const discrepancyEngine = new DiscrepancyEngine(mockDb);

    // 1. Test Payment Listing
    console.log('\n--- Test 1: List Payments ---');
    const payments = await adminService.listPayments({
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        status: ['SUCCESS', 'FAILED'] as any
    });
    console.log('Payments Found:', payments.data.length);
    console.log('First Payment:', payments.data[0]);

    // 2. Test Discrepancy Detection
    console.log('\n--- Test 2: Detect Discrepancies ---');
    const discrepancies = await discrepancyEngine.runChecks(60);
    console.log('Discrepancies Found:', discrepancies.length);
    discrepancies.forEach(d => {
        console.log(`[${d.type}] ${d.description}`);
    });

    console.log('\n--- Verification Complete ---');
}

runTest().catch(console.error);
