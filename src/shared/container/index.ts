import { PrismaClient } from '@prisma/client';
import { container, delay } from 'tsyringe';
import type { ITodoRepository } from '../../modules/todos/repositories/todo-repository.interface';
import { TodoRepository } from '../../modules/todos/repositories/todo.repository';

container.registerSingleton<ITodoRepository>(
  'TodoRepository',
  delay(() => TodoRepository)
);

container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient()
});
