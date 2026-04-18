import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { User } from '../auth/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}

  async create(dto: CreateTodoDto, user: User): Promise<Todo> {
    const todo = this.todoRepo.create({ ...dto, user });
    return this.todoRepo.save(todo);
  }

  async findAll(user: User): Promise<Todo[]> {
    return this.todoRepo.find({ where: { user: { id: user.id } } });
  }

  async update(id: string, dto: UpdateTodoDto, user: User): Promise<Todo> {
    const todo = await this.todoRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!todo) throw new NotFoundException('Todo item not found');

    Object.assign(todo, dto);
    return this.todoRepo.save(todo);
  }

  async remove(id: string, user: User): Promise<{ message: string }> {
    const result = await this.todoRepo.delete({ id, user: { id: user.id } });
    if (result.affected === 0)
      throw new NotFoundException('Todo item not found');
    return { message: 'Todo Reminder deleted successfully' };
  }
}
