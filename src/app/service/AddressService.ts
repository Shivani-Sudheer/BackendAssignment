import { plainToClass } from "class-transformer";
import { AddressRepository } from "../repository/AddressRepository";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { ErrorCodes } from "../util/rest/errorCode";
import { Address } from "../entities/Address";
export class AddressService {
    constructor(private addrepo: AddressRepository) { }
    async getAllAddress() {
        return await this.addrepo.getAllAddress();
    }


    public async getAddressbyID(id: string) {
        const address = await this.addrepo.getAddressbyID(id);
        if (!address) {
            throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
        }
        return address;
    }


    public async createAddress(addressDetails: any) {
        try {
            const newAddress = plainToClass(Address, {
                line1: addressDetails.line1,
                line2: addressDetails.line2,
                street: addressDetails.street,
                state: addressDetails.state,
                country: addressDetails.country
            });
            const save = await this.addrepo.saveAddressDetails(newAddress);
            return save;
        } catch (err) {
        
            throw err;
        }
    }


    public async addressUpdate(id: string, addressDetails: any) {
        try {
            const updatedAddress = plainToClass(Address, {
                line1: addressDetails.line1,
                line2: addressDetails.line2,

                street: addressDetails.street,
                state: addressDetails.state,
                country: addressDetails.country
            });
            const save = await this.addrepo.addressUpdate(id, updatedAddress);
            return save;
        } catch (err) {
           
        }
    }


    public async addressDelete(id: string) {
        return await this.addrepo.softDeleteAddress(id);
    }










}







