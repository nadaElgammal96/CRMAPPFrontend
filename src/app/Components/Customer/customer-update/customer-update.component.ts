import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDTO } from 'src/app/Model/Customer/CustomerDTO';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  customerId;
  customer = new CustomerDTO();
  constructor(private service: ApiService, private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params.id;
    this.service.getByParameter(this.customerId, "customers").subscribe(
      res=>{
        this.customer = res;
        console.log(this.customer);
      },
      err => { console.log(err); }
    )
  }

  update(){
    this.service.put(this.customerId , this.customer , "customers").subscribe(
      res => {
      this.router.navigate(["/home/customers"]);},
      err => {console.log(err);}
    );
  }

}
