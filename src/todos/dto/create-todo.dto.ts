import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Implement JWT Fingerprinting' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Title is too short' })
  title: string;
}
