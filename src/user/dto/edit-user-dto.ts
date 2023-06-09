export class EditUserDto {

    public readonly name: string;
    public readonly email: string;
    public readonly password: string;

    public constructor(opts?: Partial<EditUserDto>) {
        Object.assign(this, opts);
    }

}