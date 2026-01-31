import prisma from '../db/prisma';
import providerClient from './providerClient';

interface CreateRefundArgs {
  externalId: string;
  amount: number | string;
  reason: string;
}

const createRefund = async ({ externalId, amount, reason }: CreateRefundArgs) => {
  // Idempotency: return existing if present
  const existing = await prisma.refund.findUnique({ where: { externalId } });
  if (existing) return existing;

  // create local refund record
  const refund = await prisma.refund.create({
    data: {
      externalId,
      amount: amount as any,
      reason,
      status: 'PENDING',
    },
  });

  try {
    // call provider
    const res = await providerClient.createRefund({ amount: Number(amount), externalId });

    // update with provider id and status
    const updated = await prisma.refund.update({
      where: { id: refund.id },
      data: {
        providerRefundId: res.providerRefundId,
        status: res.status === 'COMPLETED' ? 'COMPLETED' : 'REQUESTED',
      },
    });

    return updated;
  } catch (err) {
    // mark failed
    await prisma.refund.update({ where: { id: refund.id }, data: { status: 'FAILED' } });
    throw err;
  }
};

const findByExternalId = async (externalId: string) => {
  return prisma.refund.findUnique({ where: { externalId } });
};

const findById = async (id: string) => {
  return prisma.refund.findUnique({ where: { id } });
};

const updateStatusByProviderId = async (providerRefundId: string, status: string) => {
  // Map provider status to local status (simple mapping)
  const mapped = status === 'COMPLETED' ? 'COMPLETED' : status === 'FAILED' ? 'FAILED' : 'PROCESSING';
  return prisma.refund.updateMany({ where: { providerRefundId }, data: { status: mapped } });
};

export default { createRefund, findByExternalId, findById, updateStatusByProviderId };
