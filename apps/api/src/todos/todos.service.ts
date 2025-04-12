import { Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { todos, Todo, NewTodo } from '@ai-todos/database';
import { DatabaseService } from '../database/database.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';

@Injectable()
export class TodosService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Todo[]> {
    return this.databaseService.db.select().from(todos).orderBy(todos.createdAt);
  }

  async findOne(id: number): Promise<Todo> {
    const result = await this.databaseService.db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);
    
    const todo = result[0];
    
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    
    return todo;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: NewTodo = {
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: createTodoDto.completed ?? false,
    };
    
    const result = await this.databaseService.db
      .insert(todos)
      .values(newTodo)
      .returning();
    
    return result[0];
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // Check if todo exists
    await this.findOne(id);
    
    const result = await this.databaseService.db
      .update(todos)
      .set({
        ...updateTodoDto,
        updatedAt: new Date(),
      })
      .where(eq(todos.id, id))
      .returning();
    
    return result[0];
  }

  async remove(id: number): Promise<void> {
    // Check if todo exists
    await this.findOne(id);
    
    await this.databaseService.db
      .delete(todos)
      .where(eq(todos.id, id));
  }
}
