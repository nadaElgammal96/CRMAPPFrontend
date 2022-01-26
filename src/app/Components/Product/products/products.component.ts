import { ProductsViewDTO } from './../../../Model/Product/ProductsViewDTO';
import { ApiService } from './../../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductsViewDTO[] = [];
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.get("products").subscribe(
      res =>{ this.products = res},
      err => {console.log(err);}
    );
  }

}
