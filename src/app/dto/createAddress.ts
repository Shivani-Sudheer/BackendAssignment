import { IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    public line1: string;

    @IsString()
    public line2: string;

    @IsString()
    public street: string;

    @IsString()
    public state: string;

    @IsString()
    public country: string;

   

    
}