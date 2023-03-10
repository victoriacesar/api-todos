import { AppError } from '../../../shared/errors/app-error.error';
import { TodoRepositoryInMemory } from '../repositories/in-memory/todo-repository.in-memory';
import { UpdateTodoByIdUseCase } from './update-todo-by-id.use-case';

let todosRepositoryInMemory: TodoRepositoryInMemory;
let updateTodoByUseCase: UpdateTodoByIdUseCase;

describe('Update Todo', () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodoRepositoryInMemory();
    updateTodoByUseCase = new UpdateTodoByIdUseCase(todosRepositoryInMemory);
  });

  it('should be able to update todo', async () => {
    const updateTodo = {
      id: 1,
      content: 'updatedTodo',
      isDone: true,
      isImportant: true
    };

    const todo = await updateTodoByUseCase.handle(updateTodo);

    expect(todo?.content).toBe(updateTodo.content);
    expect(todo?.isDone).toBeTruthy();
    expect(todo?.isImportant).toBeTruthy();
  });

  it('should not to be able to update todo when there is no id', async () => {
    const updateTodo = {
      id: 5,
      content: 'updatedTodo',
      isDone: true,
      isImportant: true
    };

    await expect(updateTodoByUseCase.handle(updateTodo)).rejects.toEqual(
      new AppError(`Todo not found`, 404)
    );
  });
});
