export class AddUserDto {

    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    public constructor(opts?: Partial<AddUserDto>) {
        Object.assign(this, opts);
    }

}