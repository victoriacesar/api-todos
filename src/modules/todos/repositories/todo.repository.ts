import { PrismaClient, type Todo } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import type { ICreateTodoDTO, IUpdateTodoByIdDTO } from '../dtos';
import type { ITodoRepository } from './todo-repository.interface';

@injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @inject('PrismaClient')
    readonly prismaClient: PrismaClient
  ) {}

  async createTodo(dto: ICreateTodoDTO): Promise<Todo> {
    const result = await this.prismaClient.todo.create({
      data: {
        author: dto.author,
        content: dto.content
      }
    });

    return result;
  }

  async findAllTodosByAuthor(author: string): Promise<Todo[]> {
    const result = await this.prismaClient.todo.findMany({
      where: {
        author
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return result;
  }

  async updateTodoById(dto: IUpdateTodoByIdDTO): Promise<Todo> {
    const { content, id, isDone, isImportant } = dto;

    const result = await this.prismaClient.todo.update({
      where: {
        id
      },
      data: {
        content,
        isDone,
        isImportant
      }
    });

    return result;
  }

  async deleteTodoById(id: number): Promise<void> {
    await this.prismaClient.todo.delete({
      where: {
        id
      }
    });
  }

  async findTodoById(id: number): Promise<Todo | null> {
    const result = await this.prismaClient.todo.findFirst({
      where: {
        id
      }
    });

    return result;
  }
}
