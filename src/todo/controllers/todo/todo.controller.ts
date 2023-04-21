import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AddTodoDto } from 'src/todo/dto/add-todo.dto';
import { EditTodoDto } from 'src/todo/dto/edit-todo.dto';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { TodoService } from 'src/todo/services/todo/todo.service';

@Controller('todo')
export class TodoController {

    public constructor(private readonly todoService: TodoService) { }

    @Get()
    public findAll(): Promise<TodoDto[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id') id: number): Promise<TodoDto> {
        return this.todoService.findOne(id);
    }

    @Put(':id')
    public edit(@Param('id') id: number, @Body() todo: EditTodoDto): Promise<TodoDto> {
        return this.todoService.edit(id, todo);
    }

    @Post()
    @UseInterceptors(ClassSerializerInterceptor)
    public add(@Body() todo: AddTodoDto): Promise<TodoDto> {
        return this.todoService.add(todo);
    }

    @Delete(':id')
    public remove(@Param('id') id: number): Promise<TodoDto> {
        return this.todoService.remove(id);
    }

}
