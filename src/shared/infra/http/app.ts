import 'reflect-metadata';
import 'dotenv/config';
import '../../container/index';
import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express';
import 'express-async-errors';
import { router } from './routes';
import { AppError } from '../../errors/app-error.error';
import { setupPrismaDatabase } from '../database/prisma';

const databaseCall = async () => await setupPrismaDatabase();
databaseCall();
const app = express();

app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});

export { app };
