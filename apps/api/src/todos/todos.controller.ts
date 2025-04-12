import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo } from '@ai-todos/database';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return all todos',
    type: [Object]
  })
  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @ApiOperation({ summary: 'Get a todo by ID' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'Return the todo',
    type: Object
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new todo' })
  @ApiResponse({ 
    status: 201, 
    description: 'The todo has been successfully created',
    type: Object
  })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @ApiOperation({ summary: 'Update a todo' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ 
    status: 200, 
    description: 'The todo has been successfully updated',
    type: Object
  })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.update(id, updateTodoDto);
  }

  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 204, description: 'The todo has been successfully deleted' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
