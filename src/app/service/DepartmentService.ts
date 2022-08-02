import { plainToClass } from "class-transformer";
import { getConnection } from "typeorm";
import { Department } from "../entities/Department";
import { Employee } from "../entities/Employee";
import HttpException from "../exception/HttpException";
import { DepartmentRepository } from "../repository/DepartmentRepository";
import { EmployeeRepository } from "../repository/EmployeeRepository";

export class DepartmentService {

    constructor(private deptrepo: DepartmentRepository) { }
    async getAllDepartments() {

        return await this.deptrepo.getAllDepartments();
    }

    public async createDepartment(departmentDetails: any) {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name      
                
                
               
            });
            const save = await this.deptrepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {
            // throw new HttpException(400, "Failed to create employee");
        }
    }
    

    public async departmentUpdate(id :string, departmentDetails: any) {
        try {
            const updatedDepartment = plainToClass(Department, {
                name: departmentDetails.name
                
            });
            const save = await this.deptrepo.departmentUpdate(id,updatedDepartment);
            return save;
        } catch (err) {
            //throw new HttpException(400, "Failed to create employee");
        }
      }


      public async departmentDelete(id: string) {
        return await this.deptrepo.softDeleteDepartment(id);
      }

   




}







