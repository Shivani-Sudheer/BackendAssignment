import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Address } from "../entities/Address";
import { UpdateAddressDto } from "./updateAddress";

export class UpdateEmployeeParamsDto {

    @IsUUID()
    public id: string;
}