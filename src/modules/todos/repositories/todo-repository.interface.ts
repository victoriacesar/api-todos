import type { Todo } from '@prisma/client';
import type { ICreateTodoDTO, IUpdateTodoByIdDTO } from '../dtos';

export interface ITodoRepository {
  createTodo: (dto: ICreateTodoDTO) => Promise<Todo>;
  findAllTodosByAuthor: (author: string) => Promise<Todo[]>;
  updateTodoById: (dto: IUpdateTodoByIdDTO) => Promise<Todo | null>;
  deleteTodoById: (id: number) => Promise<void>;
  findTodoById: (id: number) => Promise<Todo | null>;
}
