import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddUserDto } from 'src/user/dto/add-user-dto';
import { EditUserDto } from 'src/user/dto/edit-user-dto';
import { UserDto } from 'src/user/dto/user-dto';
import { UserService } from 'src/user/services/user/user.service';

@Controller('users')
export class UserController {
    public constructor(private readonly userService: UserService) { }

    @Get()
    public findAll(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id') id: number): Promise<UserDto> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    public edit(@Param('id') id: number, @Body() user: EditUserDto): Promise<UserDto> {
        return this.userService.edit(id, user);
    }

    @Post()
    public add(@Body() user: AddUserDto): Promise<UserDto> {
        return this.userService.add(user);
    }

    @Delete()
    public remove(@Param('id') id: number): Promise<UserDto> {
        return this.userService.remove(id);
    }

}
