import { getConnection } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRepository {
    async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find();
    }

    async getEmployeebyID(id:string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne(id);
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
    public async employeeUpdate(id:string,employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        const updateEmployeeDetails = await employeeRepo.update({ id: id, deletedAt: null }, employeeDetails);
        return updateEmployeeDetails;
    }

    public async softDeleteEmployee(id: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.softDelete({
            id
        });
    } 

    public async getEmployeeByUsername(username: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { username },
        });
        return employeeDetail;
    }


    // public async updateEmployee(id: string, employeeDetails: Employee) {
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     return employeeRepo.update(id, employeeDetails);
    // }
    // public async deleteEmployee(id: string) {
    //     const employeeRepo = getConnection().getRepository(Employee);
    //     return employeeRepo.delete(id);
    // }

}
