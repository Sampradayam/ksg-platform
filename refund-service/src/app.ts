import express from 'express';
import cors from 'cors';
import refundsRouter from './routes/refunds';
import providerWebhookRouter from './routes/providerWebhook';
import mockProviderRouter from './_mock/provider';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/refunds', refundsRouter);
app.use('/provider', providerWebhookRouter);
app.use('/_mock/provider', mockProviderRouter);

app.get('/', (req, res) => res.json({ ok: true, service: 'refund' }));

export default app;
