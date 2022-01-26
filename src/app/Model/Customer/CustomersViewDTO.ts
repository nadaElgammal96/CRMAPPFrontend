import { AddressDTO } from "../Address/AddressDTO";

export class CustomersVirewDTO{

    customerID: number;
    firstName: string;
    lastName: string;
    code: string;
    emailAddress: string;
    primaryPhoneNumber: string;
    active: boolean;
    customerAddresses: AddressDTO[];
    
}