import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../Services/api-service.service';
import { AddressDTO } from './../../../Model/Address/AddressDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  constructor(private service : ApiService, private activeRoute : ActivatedRoute, private router: Router) { }

  valid;
  address = new AddressDTO();

  validations = new FormGroup({
    line1: new FormControl("", Validators.required),
    line2: new FormControl("", Validators.required),
    city: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    country: new FormControl("", Validators.required),
    zip: new FormControl("", Validators.required),
  });
  
  ngOnInit(): void {
  }

  create(line1, line2, city, state, country, zip){

    this.valid = true;
    for (const k of Object.keys(this.validations.controls)) {
      if (!this.validations.controls[k].valid) {
        this.valid = false;
        break;
      }
    }

    if (this.valid) {
      this.address.addressLine1 = line1;
      this.address.addressLine2 = line2;
      this.address.state = state;
      this.address.country = country;
      this.address.postalCode = zip;
      this.address.city = city;
      this.address.customerID = this.activeRoute.snapshot.params.id;
      this.service.post(this.address, "CustomerAddress").subscribe(
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
  addressType(event) {
    if (event.value == "shipping")
      this.address.shippingAddress = !this.address.shippingAddress;

    else
      this.address.billingAddress = !this.address.billingAddress;
  }
}
