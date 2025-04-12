import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ 
    description: 'The title of the todo',
    example: 'Buy groceries',
    maxLength: 255
  })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ 
    description: 'The description of the todo',
    example: 'Buy milk, eggs, and bread',
    required: false 
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ 
    description: 'Whether the todo is completed',
    default: false,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
