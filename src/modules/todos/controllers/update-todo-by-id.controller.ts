import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import {
  type IUpdateTodoByIdUseCase,
  UpdateTodoByIdUseCase
} from '../useCases/update-todo-by-id.use-case';

export class UpdateTodoByIdController {
  async execute(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { content, isDone, isImportant } = req.body;

    const updateTodoByIdUseCase = container.resolve<IUpdateTodoByIdUseCase>(
      UpdateTodoByIdUseCase
    );

    const updatedTodo = await updateTodoByIdUseCase.handle({
      content,
      isDone,
      isImportant,
      id: Number(id)
    });

    return res.status(200).json(updatedTodo);
  }
}
