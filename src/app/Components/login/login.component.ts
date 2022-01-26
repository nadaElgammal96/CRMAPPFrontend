import { UserLoginDTO } from '../../Model/User/UserLoginDTO';
import { ApiService } from './../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedUser = new UserLoginDTO();
  constructor(private service: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loggedUser.emailAddress && this.loggedUser.password){
      
      this.service.post(this.loggedUser, "users", "login").subscribe(
        
        res => {
          //console.log(res);
          if (res) {
            this.service.authenticatedUser.emit(res);
            this.router.navigate(['/home']);
          }
          else{
            alert("Email address and/or password is not correct!");
          }
        },
        error => { console.log(error); }
      );
    }
    else{
      alert("Please fill in email and password fields");
    }

  }

}
