import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';
import { UserService } from './services/user/user.service';
import { UserMapperService } from './services/user-mapper/user-mapper.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])],
    providers: [UserService, UserMapperService],
    controllers: []
})
export class UserModule { }
