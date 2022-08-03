import { Type } from "class-transformer";
import { IsNumber, IsString, IsUUID, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./createAddress";

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

    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    public address: CreateAddressDto;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsUUID()
    public departmentId: string;   

    
}