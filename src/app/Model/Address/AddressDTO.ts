import { OrderHeaderDTO } from "../OrderHeader/OrderHeaderDTO";

export class AddressDTO{
    id: number;
    customerID: number;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    shippingAddress: boolean;
    billingAddress: boolean;
}