export class UserDto {

    public readonly id: number;
    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    public constructor(opts?: Partial<UserDto>) {
        Object.assign(this, opts);
    }

}