import { ApiService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/Model/User/UserCreateDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedInUser = new UserDTO();
  constructor(private service : ApiService) {
    this.service.authenticatedUser.subscribe(
      res =>{
        this.loggedInUser = res;
      console.log(this.loggedInUser);
    },
      err =>{ console.log(err);});
   }

  ngOnInit(): void {
    // this.service.authenticatedUser.subscribe(
    //   res =>{
    //     this.loggedInUser = res;
    //   console.log(this.loggedInUser);
    // },
    //   err =>{ console.log(err);});
  }

}
