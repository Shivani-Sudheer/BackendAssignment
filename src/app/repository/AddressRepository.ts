import { getConnection } from "typeorm";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";

export class AddressRepository {
    async getAllAddress(): Promise<Address[]> {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.find();
    }

    async getAddressbyID(id: string) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.findOne(id);
    }

    public async saveAddressDetails(addressDetails: Address) {
        const addressRepo = getConnection().getRepository(Address);
        return addressRepo.save(addressDetails);
    }
    public async addressUpdate(id: string, addressDetails: Address) {
        const addressRepo = getConnection().getRepository(Address);
        const updateAddressDetails = await addressRepo.update({ id: id, }, addressDetails);
        return updateAddressDetails;
    }

    public async softDeleteAddress(id: string) {
        const employeeRepo = getConnection().getRepository(Address);
        return employeeRepo.softDelete({
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
