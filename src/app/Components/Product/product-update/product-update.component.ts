import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ProductDTO } from 'src/app/Model/Product/ProductDTO';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product = new ProductDTO();
  productId;
  constructor(private service: ApiService, private activeRoute: ActivatedRoute, private router :Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.productId= this.activeRoute.snapshot.params.id;
    this.service.getByParameter(this.productId, "products").subscribe(
      res => {
        this.product = res;
      },
      err => { console.log(err); }
    );
  }

  update(){
    this.service.put(this.productId, this.product , "products").subscribe(
      res => {
        this.router.navigate(['/home/products']);
      },
      err => { console.log(err); }
    )
  }

}
