import { getConnection } from "typeorm";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { UpdateEmployeeDto } from "../dto/updateEmployee";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";

export class EmployeeRepository {
    async getAllEmployees():Promise<Employee[]>{
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({ relations: ['department', 'address'] });
    }

    async getEmployeebyID(id: string, relations: string[] = ["department", "address"]):Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id, { relations: relations });
    }

    public async saveEmployeeDetails(employeeDetails: CreateEmployeeDto) :Promise<CreateEmployeeDto & Employee>{
        const employeeRepo = getConnection().getRepository(Employee);

        return employeeRepo.save(employeeDetails);
    }

    public async employeeUpdate(id: string, employeeDetails: UpdateEmployeeDto) :Promise<{
        id: string;
        name: string;
        joiningDate: string;
        status: string;
        role: string;
        experience: number;
        address: Address;
        username: string;
        password: string;
        departmentId: string;
    } & Employee>{
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.save({...employeeDetails, id: id});
        return updateEmployeeDetails;
    }

    public async softDeleteEmployee(id: string):Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        const temp = await this.getEmployeebyID(id, ["address"]);
        return employeeRepo.softRemove(
            temp
        );
    }

    public async getEmployeeByUsername(username: string):Promise<Employee> {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username },
        });
        return employeeDetail;
    }

}
