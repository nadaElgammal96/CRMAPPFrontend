import { Router } from '@angular/router';
import { ProductDTO } from 'src/app/Model/Product/ProductDTO';
import { ApiService } from './../../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product =  new ProductDTO();
  valid;
  validations = new FormGroup({
    name : new FormControl("" , Validators.required),
    code : new FormControl("", Validators.required),
    description : new FormControl("" , Validators.required),
    uprice : new FormControl(0 , Validators.required),
    unit : new FormControl("" , Validators.required),

  });

  constructor(private service: ApiService, private router : Router) { }

  ngOnInit(): void {
  }
  create(name, code, description, uprice, unit){
    this.valid = true;
    for(const k of Object.keys(this.validations.controls)){
      if(!this.validations.controls[k].valid)
        {this.valid = false;
         break;}
    }
    if(this.valid){
      this.product.code = code;
      this.product.name = name;
      this.product.description = description;
      this.product.unitPrice = uprice;
      this.product.unit = unit;
      this.service.post(this.product, "products").subscribe(
        res =>{
          this.router.navigate(['/home/products']);
        },
        err =>{ console.log(err);}
      );
    }

    else{
      alert("Please fill in fields with correct data");
    }
    }
}
