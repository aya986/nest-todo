import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { UserService } from './services/user/user.service';
import { UserMapperService } from './services/user-mapper/user-mapper.service';
import { UserController } from './controllers/user/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])],
    providers: [UserService, UserMapperService],
    controllers: [UserController]
})
export class UserModule { }
