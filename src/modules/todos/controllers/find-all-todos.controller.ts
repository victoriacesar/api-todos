import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  FindAllTodosByAuthorUseCase,
  type IFindAllTodosByAuthorUseCase
} from '../useCases/find-all-todos-by-author.use-case';

export class FindAllTodosByAuthorController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { author } = req.params;

    const createTodoUseCase = container.resolve<IFindAllTodosByAuthorUseCase>(
      FindAllTodosByAuthorUseCase
    );

    const todosByAuthor = await createTodoUseCase.handle(author);

    return res.status(201).json(todosByAuthor);
  }
}
