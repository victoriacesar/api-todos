import PrismaConnector from './connector';

export const setupPrismaDatabase = async () => await PrismaConnector.connect();
