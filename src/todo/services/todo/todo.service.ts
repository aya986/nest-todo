import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTodoDto } from 'src/todo/dto/add-todo.dto';
import { EditTodoDto } from 'src/todo/dto/edit-todo.dto';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { Todo } from 'src/todo/entities/todo/todo';
import { Repository } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { TodoMapperService } from '../todo-mapper/todo-mapper.service';

@Injectable()
export class TodoService {

    public constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
        private readonly todoMapper: TodoMapperService
    ) { }

    public async findAll(): Promise<TodoDto[]> {
        const todos = await this.todoRepository.find();
        return todos.map(this.todoMapper.modelToDto);
    }

    public async findOne(id: number): Promise<TodoDto> {
        const todo = await this.todoRepository.findOneById(id);
        if (isNullOrUndefined(todo)) throw new NotFoundException();
        return this.todoMapper.modelToDto(todo);
    }


    public async add({ title }: AddTodoDto): Promise<TodoDto> {
        let todo = new Todo(title);
        todo = await this.todoRepository.save(todo);
        return this.todoMapper.modelToDto(todo);
    }

    public async edit(id: number, { title, completed }: EditTodoDto): Promise<TodoDto> {
        let todo = await this.todoRepository.findOneById(id);

        if (isNullOrUndefined(todo)) throw new NotFoundException();

        todo.completed = completed;
        todo.title = title;

        todo = await this.todoRepository.save(todo);

        return this.todoMapper.modelToDto(todo);
    }

    public async remove(id: number): Promise<Todo> {
        let todo = await this.todoRepository.findOneById(id);

        if (isNullOrUndefined(todo)) throw new NotFoundException();

        todo = await this.todoRepository.remove(todo);

        return todo;
    }
}
