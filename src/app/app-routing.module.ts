import { ProductUpdateComponent } from './Components/Product/product-update/product-update.component';
import { ProductsComponent } from './Components/Product/products/products.component';
import { CustomerCreateComponent } from './Components/Customer/customer-create/customer-create.component';
import { UserUpdateComponent } from './Components/User/user-update/user-update.component';
import { UsersComponent } from './Components/User/users/users.component';
import { HomeComponent } from './Components/home-navbar/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './Components/User/user-create/user-create.component';
import { CustomersComponent } from './Components/Customer/customers/customers.component';
import { CustomerUpdateComponent } from './Components/Customer/customer-update/customer-update.component';
import { ProductCreateComponent } from './Components/Product/product-create/product-create.component';
import { AddressCreateComponent } from './Components/Address/address-create/address-create.component';
import { OrderHeaderComponent } from './Components/Orders/order-header/order-header.component';

const routes: Routes = [
  {path:'', redirectTo: 'login', pathMatch: 'full' },
  {path:"login" , component: LoginComponent},
  {path:"register" , component: UserCreateComponent},
  {path:"home" , component: HomeComponent,
  children:[
    {path:"users" , component: UsersComponent},
    {path:"userupdate/:id" , component: UserUpdateComponent},
    {path:"usercreate" , component: UserCreateComponent},
    {path:"customers" , component: CustomersComponent},
    {path:"customerupdate/:id" , component: CustomerUpdateComponent},
    {path:"customercreate" , component: CustomerCreateComponent},
    {path:"products", component: ProductsComponent},
    {path:"productcreate", component: ProductCreateComponent},
    {path:"productupdate/:id", component: ProductUpdateComponent},
    {path:"customers/addAddress/:id" , component: AddressCreateComponent},
    {path:"orders", component: OrderHeaderComponent},

  ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
