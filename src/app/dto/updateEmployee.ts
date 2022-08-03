import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./updateAddress";

export class UpdateEmployeeDto {

    @IsOptional()
    @IsString()    
    public name: string;

    @IsOptional()
    @IsString()
    public joiningDate: string;

    @IsOptional()
    @IsString()
    public status: string;

    @IsOptional()
    @IsString()
    public role: string;

    @IsOptional()
    @IsNumber()
    public experience: number;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateAddressDto)
    public address: Address;

    @IsOptional()
    @IsString()
    public username: string;

    @IsOptional()
    @IsString()
    public password: string;

    @IsOptional()
    @IsUUID()
    public departmentId: string;

    
}