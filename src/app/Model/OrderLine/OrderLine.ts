import { TaxDTO } from '../Tax/TaxDTO';
import { ProductDTO } from './../Product/ProductDTO';
export class OrderLineDTO{
    orderLineID :number;
    orderLineNumber: number;
    quantity: number;
    subtotal :number;
    grandtotal:number;
    orderHeaderID: number;
    productID: number;
    product: ProductDTO;
    taxID: number;
    tax: TaxDTO;
}