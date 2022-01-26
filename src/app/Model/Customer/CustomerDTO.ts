import { AddressDTO } from "../Address/AddressDTO";

export class CustomerDTO{
    customerID: number;
    firstName: string;
    lastName: string;
    code: string;
    emailAddress: string;
    primaryPhoneNumber:string;
    otherPhoneNumber: string;
    active: boolean;
    customerAddresses: AddressDTO[];
}