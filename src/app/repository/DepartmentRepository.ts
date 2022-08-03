import { getConnection } from "typeorm";
import { Department } from "../entities/Department";

export class DepartmentRepository {
    async getAllDepartments(): Promise<Department[]> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.find();
    }
    public async saveDepartmentDetails(departmentDetails: Department): Promise<Department> {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }
    public async departmentUpdate(id: string, departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        const updateDepartmentDetails = await departmentRepo.update({ id: id }, departmentDetails);
        return updateDepartmentDetails;
    }

    public async softDeleteDepartment(id: string): Promise<void> {
        const departmentRepo = getConnection().getRepository(Department);
        departmentRepo.softDelete({
            id
        });
    }




}
