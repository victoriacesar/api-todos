import { inject, injectable } from 'tsyringe';
import { ITodoRepository } from '../repositories/todo-repository.interface';

export interface IDeleteTodoByIdUseCase {
  handle: (id: number) => Promise<void>;
}

@injectable()
export class DeleteTodoByIdUseCase implements IDeleteTodoByIdUseCase {
  constructor(
    @inject('TodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  async handle(id: number): Promise<void> {
    await this.todoRepository.deleteTodoById(id);
  }
}
