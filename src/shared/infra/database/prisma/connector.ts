import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const connect = async () => {
  if (!prisma) {
    prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });
    await prisma.$connect();
  }
  return prisma;
};

const getClient = () => {
  if (!prisma) {
    throw new Error(
      'Cannot get a prisma instance, first connect into database!'
    );
  }

  return prisma;
};

export default { connect, getClient };
