import { plainToClass } from "class-transformer";
import { Department } from "../entities/Department";
import { DepartmentRepository } from "../repository/DepartmentRepository";

export class DepartmentService {
    constructor(private deptrepo: DepartmentRepository) { }
    async getAllDepartments(): Promise<Department[]> {
        return await this.deptrepo.getAllDepartments();
    }

    public async createDepartment(departmentDetails: any): Promise<Department> {
        try {
            const newDepartment = plainToClass(Department, {
                name: departmentDetails.name
            });
            const save = await this.deptrepo.saveDepartmentDetails(newDepartment);
            return save;
        } catch (err) {

        }
    }

    public async departmentUpdate(id: string, departmentDetails: any) {
        try {
            const updatedDepartment = plainToClass(Department, {
                name: departmentDetails.name
            });
            const save = await this.deptrepo.departmentUpdate(id, updatedDepartment);
            return save;
        } catch (err) {

        }
    }

    public async departmentDelete(id: string) :Promise<void>{
        return await this.deptrepo.softDeleteDepartment(id);
    }

}







