import { CustomersVirewDTO } from './../../../Model/Customer/CustomersViewDTO';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api-service.service';
import { CustomerDTO } from 'src/app/Model/Customer/CustomerDTO';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers : CustomersVirewDTO[] = [];
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.get("customers","GetAllCustomersWithAdress").subscribe(
      res =>{ this.customers = res },
      err => {console.log(err);}
    );
    // this.service.get("customers","GetAllCustomersWithAdress").subscribe(
    //   res => {console.log(res);},
    //   err => {console.log(err);}
    // )
  }

  deleteCustomer(id){
    let confirmation = confirm("Are you sure you want to delete customer?");
    if(confirmation){
      this.service.delete(id , "customers").subscribe(
        res =>{
          this.loadData();
        },
        err => {console.log(err);}
      );
    }
  }

  changeActivation(id){

    let customer = new CustomerDTO();
    this.service.getByParameter(id, "customers").subscribe(
      res => {
        customer = res;
        let confirmation = confirm(`Are you sure you want to change activation of customer ${customer.firstName} ${customer.lastName}`);

        if(confirmation){
    
          this.service.put(id, customer , "customers" , "changeActivation").subscribe(
            data => {
                      this.loadData();
                    },
            error => {console.log(error);}
          );
        }
      },
      err => {console.log(err);}
    )
    
    
  }

}
