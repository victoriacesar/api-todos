import type { Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/app-error.error';
import type { IUpdateTodoByIdDTO } from '../dtos';
import { ITodoRepository } from '../repositories/todo-repository.interface';

export interface IUpdateTodoByIdUseCase {
  handle: (dto: IUpdateTodoByIdDTO) => Promise<Todo | null | undefined>;
}

@injectable()
export class UpdateTodoByIdUseCase implements IUpdateTodoByIdUseCase {
  constructor(
    @inject('TodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  async handle(dto: IUpdateTodoByIdDTO): Promise<Todo | null> {
    const findTodo = await this.todoRepository.findTodoById(dto.id);

    if (!findTodo) {
      throw new AppError(`Todo not found`, 404);
    }

    const updateTodo = await this.todoRepository.updateTodoById(dto);

    return updateTodo;
  }
}
