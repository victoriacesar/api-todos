import { TodoRepositoryInMemory } from '../repositories/in-memory/todo-repository.in-memory';
import { FindAllTodosByAuthorUseCase } from './find-all-todos-by-author.use-case';

let todosRepositoryInMemory: TodoRepositoryInMemory;
let findAllTodosByAuthor: FindAllTodosByAuthorUseCase;

describe('Find All Todos By Author', () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodoRepositoryInMemory();
    findAllTodosByAuthor = new FindAllTodosByAuthorUseCase(
      todosRepositoryInMemory
    );
  });

  it('should be able to find all the todos made by an author', async () => {
    const todosByAuthor = await findAllTodosByAuthor.handle('firstAuthor');

    expect(todosByAuthor.length).toBeGreaterThanOrEqual(1);
    expect(todosByAuthor).not.toBeUndefined();
  });
});
