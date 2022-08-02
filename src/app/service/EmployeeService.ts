import { plainToClass } from "class-transformer";
import { EntityNotFoundError, getConnection } from "typeorm";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { EmployeeRepository } from "../repository/EmployeeRepository";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/rest/errorCode";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
export class EmployeeService {

    constructor(private emprepo: EmployeeRepository) { }
    async getAllEmployees() {

        return await this.emprepo.getAllEmployees();
    }


    public async getEmployeebyID(id:string) {

        const employee=await this.emprepo.getEmployeebyID(id);

        if(!employee)
        {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }

        return employee;
    }


    public async createEmployee(employeeDetails: any) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,           
                username: employeeDetails.username,
                password:employeeDetails.password?await bcrypt.hash(employeeDetails.password,10):'',
                joiningDate: employeeDetails.joiningDate,
                role:employeeDetails.role,
                status:employeeDetails.status,
                experience:employeeDetails.experience,
                address:employeeDetails.address,
                departmentId: employeeDetails.departmentId
            });
            const save =await this.emprepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            // throw new HttpException(400, "Failed to create employee");
            throw err;
        }
    }
    

    public async employeeUpdate(id :string, employeeDetails: any) {
        try {
            const updatedEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                username: employeeDetails.username,
                password: employeeDetails.password,
                joiningDate: employeeDetails.joiningDate,
                role:employeeDetails.role,
                status:employeeDetails.status,
                experience:employeeDetails.experience,
                address:employeeDetails.address,
                departmentId: employeeDetails.departmentId
            });
            const save = await this.emprepo.employeeUpdate(id,updatedEmployee);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
      }


      public async employeeDelete(id: string) {
        return await this.emprepo.softDeleteEmployee(id);
      }

   



    public employeeLogin = async (
        name: string,
        password: string
      ) => {
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
            "role":employeeDetails.role
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







