import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import type { ICreateTodoDTO } from '../dtos';
import {
  CreateTodoUseCase,
  type ICreateTodoUseCase
} from '../useCases/create-todo.use-case';

export class CreateTodoController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { content, author }: ICreateTodoDTO = req.body;

    const createTodoUseCase =
      container.resolve<ICreateTodoUseCase>(CreateTodoUseCase);

    const todo = await createTodoUseCase.handle({ author, content });

    return res.status(201).json(todo);
  }
}
