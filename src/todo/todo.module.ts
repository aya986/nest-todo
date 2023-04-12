import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo/todo';
import { TodoService } from './services/todo/todo.service';
import { TodoMapperService } from './services/todo-mapper/todo-mapper.service';
import { TodoController } from './controllers/todo/todo.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo]),
    ],
    controllers: [TodoController],
    providers: [TodoService, TodoMapperService]
})
export class TodoModule { }
