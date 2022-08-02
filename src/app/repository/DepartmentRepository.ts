import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository {
    async getAllDepartments() {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }
    public async departmentUpdate(id:string,departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update({ id: id }, departmentDetails);
        return updateDepartmentDetails;
    }

    public async softDeleteDepartment(id: string) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.softDelete({
            id
        });
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
