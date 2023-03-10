import type { Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { ITodoRepository } from '../repositories/todo-repository.interface';

export interface IFindAllTodosByAuthorUseCase {
  handle: (author: string) => Promise<Todo[]>;
}

@injectable()
export class FindAllTodosByAuthorUseCase
  implements IFindAllTodosByAuthorUseCase
{
  constructor(
    @inject('TodoRepository')
    private readonly todoRepository: ITodoRepository
  ) {}

  async handle(author: string): Promise<Todo[]> {
    const todosByAuthor = await this.todoRepository.findAllTodosByAuthor(
      author
    );

    return todosByAuthor;
  }
}
