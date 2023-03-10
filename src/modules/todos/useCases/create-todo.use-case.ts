import type { Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import type { ICreateTodoDTO } from '../dtos';
import { ITodoRepository } from '../repositories/todo-repository.interface';

export interface ICreateTodoUseCase {
  handle: (dto: ICreateTodoDTO) => Promise<Todo>;
}

@injectable()
export class CreateTodoUseCase implements ICreateTodoUseCase {
  constructor(
    @inject('TodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  async handle(dto: ICreateTodoDTO): Promise<Todo> {
    const todo = await this.todoRepository.createTodo(dto);
    return todo;
  }
}
