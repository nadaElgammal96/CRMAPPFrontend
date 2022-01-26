import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { OrderHeaderComponent } from './Components/Orders/order-header/order-header.component';
import { UsersComponent } from './Components/User/users/users.component';
import { HomeComponent } from './Components/home-navbar/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserUpdateComponent } from './Components/User/user-update/user-update.component';
import { CustomersComponent } from './Components/Customer/customers/customers.component';
import { CustomerUpdateComponent } from './Components/Customer/customer-update/customer-update.component';
import { UserCreateComponent } from './Components/User/user-create/user-create.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerCreateComponent } from './Components/Customer/customer-create/customer-create.component';
import { ProductsComponent } from './Components/Product/products/products.component';
import { ProductCreateComponent } from './Components/Product/product-create/product-create.component';
import { ProductUpdateComponent } from './Components/Product/product-update/product-update.component';
import { AddressCreateComponent } from './Components/Address/address-create/address-create.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderHeaderComponent,
    UsersComponent,
    HomeComponent,
    UserUpdateComponent,
    CustomersComponent,
    CustomerUpdateComponent,
    UserCreateComponent,
    CustomerCreateComponent,
    ProductsComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    AddressCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
