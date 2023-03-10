import type { Todo } from '@prisma/client';
import type { ICreateTodoDTO, IUpdateTodoByIdDTO } from '../../dtos';
import type { ITodoRepository } from '../todo-repository.interface';

export class TodoRepositoryInMemory implements ITodoRepository {
  todos: Todo[] = [
    {
      author: 'firstAuthor',
      content: 'firstContent',
      createdAt: new Date(),
      id: 1,
      isDone: false,
      isImportant: false,
      updatedAt: new Date()
    },
    {
      author: 'secondAuthor',
      content: 'secondContent',
      createdAt: new Date(),
      id: 2,
      isDone: false,
      isImportant: false,
      updatedAt: new Date()
    }
  ];

  async createTodo(dto: ICreateTodoDTO): Promise<Todo> {
    const todo: Todo = {
      author: dto.author,
      content: dto.content,
      createdAt: new Date(),
      id: this.todos.length + 1,
      isDone: false,
      isImportant: false,
      updatedAt: new Date()
    };

    this.todos.push(todo);

    return todo;
  }

  async findAllTodosByAuthor(author: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.author === author);
  }

  async updateTodoById(dto: IUpdateTodoByIdDTO): Promise<Todo | null> {
    const { id, content, isDone, isImportant } = dto;
    const findTodo = this.todos.find((todo) => todo.id === Number(id));

    if (!findTodo) return null;

    const findIndex = this.todos.findIndex((todo) => todo.id === id);

    this.todos[findIndex] = {
      author: findTodo?.author,
      content: content ?? findTodo?.content,
      createdAt: findTodo?.createdAt,
      id: findTodo?.id,
      isDone: isDone ?? findTodo?.isDone,
      isImportant: isImportant ?? findTodo?.isImportant,
      updatedAt: new Date()
    };

    return this.todos[findIndex];
  }

  async deleteTodoById(id: number): Promise<void> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);

    this.todos.splice(todoIndex, 1);
  }

  async findTodoById(id: number): Promise<Todo | null> {
    return this.todos.find((todo) => todo.id === id) ?? null;
  }
}
