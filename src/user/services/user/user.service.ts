import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/user/dto/add-user-dto';
import { EditUserDto } from 'src/user/dto/edit-user-dto';
import { UserDto } from 'src/user/dto/user-dto';
import { User } from 'src/user/entities/user/user';
import { Repository } from 'typeorm';
import { isNullOrUndefined } from 'util';
import { UserMapperService } from '../user-mapper/user-mapper.service';

@Injectable()
export class UserService {

    public constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly userMapper: UserMapperService

    ) { }

    public async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find();
        return users.map(this.userMapper.modelToDto);
    }

    public async findOne(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne({
            where: {
                id: id
            }
        });
        if (isNullOrUndefined(user)) throw new NotFoundException();
        return this.userMapper.modelToDto(user);
    }

    public async add({ name, email, password }: AddUserDto): Promise<UserDto> {
        let user = new User(name, email, password);
        user = await this.userRepository.save(user);
        return this.userMapper.modelToDto(user);
    }

    public async edit(id: number, { name, email }: EditUserDto): Promise<UserDto> {
        let user = await this.userRepository.findOne({
            where: {
                id: id
            }
        });
        if (isNullOrUndefined(user)) throw new NotFoundException();

        user = await this.userRepository.save({ ...user ,name, email });
        return this.userMapper.modelToDto(user);
    }

    public async remove(id: number): Promise<User> {
        let user = await this.userRepository.findOne({
            where: {
                id: id
            }
        });
        if (isNullOrUndefined(user)) throw new NotFoundException();

        user = await this.userRepository.remove(user);
        return user;
    }
}
