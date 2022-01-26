import { AddressDTO } from './../../../Model/Address/AddressDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerDTO } from 'src/app/Model/Customer/CustomerDTO';
import { ApiService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer = new CustomerDTO();
  address = new AddressDTO();
  valid;

  validations = new FormGroup({
    fname: new FormControl("", Validators.required),
    lname: new FormControl("", Validators.required),
    code: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z0-9]+@+[a-z]+\.+[a-z]{2,3}")]),
    primaryPhone: new FormControl("", [Validators.required, Validators.minLength(11),
    Validators.maxLength(11), Validators.pattern("[01]+[0-9]{9}")]),
    otherPhone: new FormControl("", [Validators.minLength(11), Validators.maxLength(11),
    Validators.pattern("[01]+[0-9]{9}")])
  })

  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
  }


  create(fname, lname, code, email, pPhone, oPhone) {
    this.valid = true;
    for (const k of Object.keys(this.validations.controls)) {
      if (!this.validations.controls[k].valid) {
        this.valid = false;
        break;
      }
    }
    if (this.valid) {
      this.customer.firstName = fname;
      this.customer.lastName = lname;
      this.customer.code = code;
      this.customer.emailAddress = email;
      this.customer.primaryPhoneNumber = pPhone;
      this.customer.otherPhoneNumber = oPhone;
      this.service.post(this.customer, "customers").subscribe(
        res => {
          this.router.navigate(['/home/customers']);
        },
        err => { console.log(err); }
      );
    }

    else {
      alert("Please fill in fields with correct data");
    }
  }

  customerActivity(event) {
    this.customer.active = event.value;
    console.log(event.value);
  }

  // createAddressFlag = false;
  // createAddressCheck() {
  //   this.createAddressFlag = !this.createAddressFlag;
  // }

  // addressType(event) {
  //   if (event.value == "shipping")
  //     this.address.shippingAddress = true;

  //   else
  //     this.address.billingAddress = true;
  // }
}
