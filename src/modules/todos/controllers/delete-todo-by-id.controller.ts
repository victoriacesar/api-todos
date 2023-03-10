import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  DeleteTodoByIdUseCase,
  type IDeleteTodoByIdUseCase
} from '../useCases/delete-todo-by-id.use-case';

export class DeleteTodoByIdController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTodoByIdUseCase = container.resolve<IDeleteTodoByIdUseCase>(
      DeleteTodoByIdUseCase
    );

    await deleteTodoByIdUseCase.handle(Number(id));

    return res.status(204).send();
  }
}
