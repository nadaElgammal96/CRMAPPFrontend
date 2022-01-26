
export class OrderHeaderDTO{
    orderHeaderID: number;
    orderNumber:string;
    orderStatus:string;
    orderDate:Date;
    customerID:number;
    taxID = 1;
    shippingAmount:number;
    subtotal:number;
    grandtotal:number;
    shippingAddressID: number;
    billingAddressID: number;
}