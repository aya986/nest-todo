import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user/user';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])],
    providers: [],
    controllers: []
})
export class UserModule { }
