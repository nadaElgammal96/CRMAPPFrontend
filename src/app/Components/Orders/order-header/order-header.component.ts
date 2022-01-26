import { ProductDTO } from './../../../Model/Product/ProductDTO';
import { TaxDTO } from './../../../Model/Tax/TaxDTO';
import { OrderLineDTO } from './../../../Model/OrderLine/OrderLine';
import { AddressDTO } from './../../../Model/Address/AddressDTO';
import { CustomerDTO } from './../../../Model/Customer/CustomerDTO';
import { ApiService } from './../../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderHeaderDTO } from 'src/app/Model/OrderHeader/OrderHeaderDTO';

@Component({
  selector: 'app-order-header',
  templateUrl: './order-header.component.html',
  styleUrls: ['./order-header.component.css']
})
export class OrderHeaderComponent implements OnInit {

  validOrderHeader;
  validAddress;
  validations = new FormGroup({
    orderNo: new FormControl("", Validators.required),
    status: new FormControl("", Validators.required),
    date: new FormControl(Validators.required),
    custCode: new FormControl("", Validators.required),
    amount: new FormControl(0, Validators.required),
    subtotal: new FormControl(0, Validators.required),
    grandtotal: new FormControl(0, Validators.required),
    line1: new FormControl("", Validators.required),
    line2: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required),
    zipcode: new FormControl("", Validators.required),

  });

  orderHeader = new OrderHeaderDTO();
  customer = new CustomerDTO();
  shippingAddress = new AddressDTO();
  billingAddress = new AddressDTO();
  addNewShippingAddressFlag: boolean;
  useExistingShippingAddressFlag: boolean
  orderLines: OrderLineDTO[] = [];
  orderLine;

  constructor(private service: ApiService) {
  }

  ngOnInit(): void {
  }

  addNewShippingAddress() {
    this.addNewShippingAddressFlag = true;
    this.useExistingShippingAddressFlag = false;
  }

  useExistingShippingAddress(custCode) {
    this.addNewShippingAddressFlag = false;
    this.useExistingShippingAddressFlag = true;
    if (!this.validations.controls["custCode"].valid)
      alert("Please Enter customer code first");

    else {

      // get customer object by code
      this.service.getByParameter(custCode, "Customers/findByCode").subscribe(
        res => {
          this.customer = res;

          // get all shipping addresses for the customer
          this.service.getByParameter(this.customer.customerID,
            "CustomerAddress/findShippingAdressByCustomer").subscribe(
              res => {
                if (res?.length > 0) {
                  this.shippingAddress = res[0];
                }
                else {
                  alert("there is no shipping addresses for this customer");
                }
              },
              err => {
                console.log(err);
              }
            );

          
          // get all billing addresses for the customer
          this.service.getByParameter(this.customer.customerID,
            "CustomerAddress/findBillingAdressByCustomer").subscribe(
              res => {
                if (res?.length > 0) {
                  this.billingAddress = res[0];
                }
                else {
                  alert("there is no billing addresses for this customer");
                }
              },
              err => {
                console.log(err);
              }
            );
        },
        err => { console.log(err); }
      );
    }
  }
  validateOrderHeader() {
    this.validOrderHeader = true;
    for (const k of Object.keys(this.validations.controls).slice(0, 7)) {
      if (!this.validations.controls[k].valid) {
        this.validOrderHeader = false;
        break;
      }
    }
  }

  validateAddress() {
    this.validAddress = true;
    for (const k of Object.keys(this.validations.controls).slice(7, -1)) {
      if (!this.validations.controls[k].valid) {
        this.validAddress = false;
        break;
      }
    }
  }


  // assign shipping and billing fields for objects
  saveAddress(line1, line2, city, state, country, zip, bline1, bline2, bcity, bstate, bcountry, bzip) {
    this.validateAddress();
    if (this.validAddress) {
      this.shippingAddress.addressLine1 = line1;
      this.shippingAddress.addressLine2 = line2;
      this.shippingAddress.state = state;
      this.shippingAddress.country = country;
      this.shippingAddress.postalCode = zip;
      this.shippingAddress.city = city;
      this.shippingAddress.billingAddress = false;
      this.shippingAddress.shippingAddress = true;

      this.billingAddress.addressLine1 = bline1;
      this.billingAddress.addressLine2 = bline2;
      this.billingAddress.state = bstate;
      this.billingAddress.country = bcountry;
      this.billingAddress.city = bcity;
      this.billingAddress.postalCode = bzip;
      this.billingAddress.shippingAddress = false;
      this.billingAddress.billingAddress = true;
      console.log("done");
    }
  }


  // create order 
  create(orderNo, status, date, custCode, amount) {

    this.validateOrderHeader();
    if (this.validOrderHeader) {

      this.assignOrderData(orderNo, status, date, amount);

      if (!this.customer.customerID) {

        // get customer by code if not getten before
        this.service.getByParameter(custCode, "Customers/findByCode").subscribe(
          res => {
            this.customer = res;
            this.postAddress();
          },
          err => { console.log(err); }
        );
      }
      else {
        this.postAddress();
      }
    }
  }


  // assign data to orderHeader object properties
  assignOrderData(orderNo, status, date, amount) {
    this.orderHeader.orderDate = date;
    this.orderHeader.orderStatus = status;
    this.orderHeader.orderNumber = orderNo;
    this.orderHeader.shippingAmount = amount;
  }


  postOrder() {

    // calculate order header subtotal
    this.orderHeader.subtotal = 0;
    for (let o of this.orderLines) {
      this.orderHeader.subtotal += o.grandtotal;
    }

    // calculate order header grand total
    this.orderHeader.grandtotal = this.orderHeader.shippingAmount;
    this.orderHeader.grandtotal = parseFloat(this.orderHeader.grandtotal.toString()) + parseFloat((this.orderHeader.subtotal * 1.14).toString());

    // save order header to database
    this.service.post(this.orderHeader, "OrderHeaders").subscribe(
      res => {
        console.log(res);

        // assign order header id to all order lines in order
        for (let orderLine of this.orderLines) {
          orderLine.orderHeaderID = res.orderHeaderID;
          orderLine.product = null;
          orderLine.tax = null;
        }

        // save order lines in order to database
        this.service.post(this.orderLines, "OrderDetails/AddByRange").subscribe(
          res => { console.log(res); },
          err => { console.log(err); }
        );
      },
      err => { console.log(err); }
    );
  }

  postAddress() {

    this.orderHeader.customerID = this.customer.customerID;
    if (this.addNewShippingAddressFlag) {

      console.log(this.shippingAddress);

      this.shippingAddress.customerID = this.customer.customerID;
      this.shippingAddress.id = 0;
      this.billingAddress.customerID = this.customer.customerID;
      this.billingAddress.id = 0;


      // save shipping address to database
      this.service.post(this.shippingAddress, "CustomerAddress").subscribe(
        res => {
          console.log(res);

          this.shippingAddress = res;
          this.orderHeader.shippingAddressID = res.id;

          // save billing address to database
          this.service.post(this.billingAddress, "CustomerAddress").subscribe(
            res => {
              this.billingAddress = res;
              this.orderHeader.billingAddressID = res.id;
              this.postOrder();
            },
            err => { console.log(err); }
          );
        },
        err => { console.log(err); }
      );
    }
    else {

      // assign shipping and billing addresses IDs to orders header object
      this.orderHeader.shippingAddressID = this.shippingAddress.id;
      this.orderHeader.billingAddressID = this.billingAddress.id;
      this.postOrder();
    }
  }

  AddLine(prodCode, quantity, _tax, linenumber) {
    console.log(prodCode);

    if (prodCode != null || prodCode != undefined || prodCode != "") {

      this.orderLine = new OrderLineDTO();
      // assign OrderLine properties values
      this.orderLine.quantity = quantity;
      this.orderLine.orderLineNumber = linenumber;
      let taxFraction = _tax / 100;

      // get tax object details
      let tax = new TaxDTO();
      tax.rate = _tax / 100;
      tax.name = prodCode + " tax";

      // save tax to database
      this.service.post(tax, "Taxes").subscribe(
        res => {
          tax = res;
          this.orderLine.tax = tax;
          this.orderLine.taxID = tax.taxID;
        },
        err => { console.log(err); }
      );

      // get product object details
      let product = new ProductDTO();
      this.service.getByParameter(prodCode, "products/findByCode").subscribe(
        res => {
          if (res) {
            product = res;
            this.orderLine.productID = product.productID;
            this.orderLine.product = product;
            this.orderLine.subtotal = this.orderLine.product.unitPrice * this.orderLine.quantity;
            this.orderLine.grandtotal = this.orderLine.subtotal * (1 + taxFraction);
            this.orderLines.push(this.orderLine);
          }
          else {
            alert("no product found");
          }
        },
        err => { console.log(err); }
      );


    }
    else {
      alert("Please enter product code");
    }
  }

  // remove order line object from array
  removeLine(index) {
    this.orderLines.splice(index, 1);
  }
}
