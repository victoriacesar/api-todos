import { TodoRepositoryInMemory } from '../repositories/in-memory/todo-repository.in-memory';
import { DeleteTodoByIdUseCase } from './delete-todo-by-id.use-case';

let todosRepositoryInMemory: TodoRepositoryInMemory;
let deleteTodoByIdUseCase: DeleteTodoByIdUseCase;

describe('Delete Todo', () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodoRepositoryInMemory();
    deleteTodoByIdUseCase = new DeleteTodoByIdUseCase(todosRepositoryInMemory);
  });

  it('should be able to delete todo', async () => {
    await deleteTodoByIdUseCase.handle(2);

    const todo = await todosRepositoryInMemory.findTodoById(2);

    expect(todo).toBeNull();
  });
});
