import { IsUUID } from "class-validator";
export class UpdateEmployeeParamsDto{

    @IsUUID()
    public id: string;

}