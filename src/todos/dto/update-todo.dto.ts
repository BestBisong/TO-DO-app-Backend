import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
