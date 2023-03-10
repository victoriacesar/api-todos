import { TodoRepositoryInMemory } from '../repositories/in-memory/todo-repository.in-memory';
import { CreateTodoUseCase } from './create-todo.use-case';

let todosRepositoryInMemory: TodoRepositoryInMemory;
let createTodoUseCase: CreateTodoUseCase;

describe('Create Todo', () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodoRepositoryInMemory();
    createTodoUseCase = new CreateTodoUseCase(todosRepositoryInMemory);
  });

  it('should be able to create a new todo', async () => {
    const todo = await createTodoUseCase.handle({
      author: 'thirdAuthor',
      content: 'thirdContent'
    });

    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('isDone');
    expect(todo).toHaveProperty('isImportant');
  });
});
