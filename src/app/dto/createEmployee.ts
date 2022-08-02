import { IsNumber, IsString, IsUUID } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    
    public name: string;

    @IsString()
    public joiningDate: string;

    @IsString()
    public status: string;

    @IsString()
    public role: string;

    @IsNumber()
    public experience: number;

    @IsString()
    public address: string;

    @IsString()
    public username: string;
    @IsString()
    public password: string;
    @IsUUID()
    public departmentId: string;

    
}