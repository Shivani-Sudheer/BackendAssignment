import { Employee } from "../entities/Employee";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/rest/errorCode";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import { CreateEmployeeDto } from "../dto/createEmployee";
import { UpdateEmployeeDto } from "../dto/updateEmployee";

export class EmployeeService {

    constructor(private emprepo: EmployeeRepository) { }
    async getAllEmployees(): Promise<Employee[]> {
        return await this.emprepo.getAllEmployees();
    }

    public async getEmployeebyID(id: string): Promise<Employee> {
        const employee = await this.emprepo.getEmployeebyID(id);
        if (!employee) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        return employee;
    }

    public async createEmployee(employeeDetails: CreateEmployeeDto): Promise<Employee> {
        try {
            const address = employeeDetails.address;
            employeeDetails = { ...employeeDetails, password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '' }
            const save = await this.emprepo.saveEmployeeDetails(employeeDetails);
            return save;
        } catch (err) {            
            throw err;
        }
    }

    public async employeeUpdate(id: string, employeeDetails: UpdateEmployeeDto): Promise<Employee> {
        const employee: Employee = await this.getEmployeebyID(id);
        employeeDetails.address.id = employee.address.id;
        employeeDetails = { ...employeeDetails, password: employeeDetails.password ? await bcrypt.hash(employeeDetails.password, 10) : '' }
        const save = await this.emprepo.employeeUpdate(id, employeeDetails);
        return save;
    }

    public async employeeDelete(id: string): Promise<Employee> {
        return await this.emprepo.softDeleteEmployee(id);
    }

    public async employeeLogin (
        name: string,
        password: string
    ):Promise<{
        idToken: string;
        employeeDetails: Employee;
    }> {
        const employeeDetails = await this.emprepo.getEmployeeByUsername(
            name
        );
        if (!employeeDetails) {
            throw new UserNotAuthorizedException(ErrorCodes.UNAUTHORIZED);
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        if (validPassword) {
            let payload = {
                "custom:id": employeeDetails.id,
                "custom:name": employeeDetails.name,
                "role": employeeDetails.role
            };
            const token = this.generateAuthTokens(payload);

            return {
                idToken: token,
                employeeDetails,
            };
        } else {
            throw new IncorrectUsernameOrPasswordException(ErrorCodes.INCORRECT_PASSWORD);
        }
    };

    private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
            expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
    };

}







