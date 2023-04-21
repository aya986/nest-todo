import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user-dto';
import { User } from 'src/user/entities/user/user';

@Injectable()
export class UserMapperService {
    public modelToDto({ id, name, email, password }: User): UserDto {
        return new UserDto({ id, name, email, password });
    }
}
