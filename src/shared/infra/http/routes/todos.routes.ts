import { Router } from 'express';
import { CreateTodoController } from '../../../../modules/todos/controllers/create-todo.controller';
import { DeleteTodoByIdController } from '../../../../modules/todos/controllers/delete-todo-by-id.controller';
import { FindAllTodosByAuthorController } from '../../../../modules/todos/controllers/find-all-todos.controller';
import { UpdateTodoByIdController } from '../../../../modules/todos/controllers/update-todo-by-id.controller';

const todosRoutes = Router();
const findAllTodosByAuthorController = new FindAllTodosByAuthorController();
const createTodoController = new CreateTodoController();
const updateTodoByIdController = new UpdateTodoByIdController();
const deleteTodoByIdController = new DeleteTodoByIdController();

todosRoutes.get('/:author', findAllTodosByAuthorController.execute);
todosRoutes.post('/', createTodoController.execute);
todosRoutes.patch('/:id', updateTodoByIdController.execute);
todosRoutes.delete('/:id', deleteTodoByIdController.execute);

export { todosRoutes };
