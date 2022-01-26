import { Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api-service.service';
import { UserDTO } from 'src/app/Model/User/UserCreateDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = new UserDTO();
  valid;
  
  constructor(private service: ApiService, private router: Router) { }

  validations = new FormGroup({
    fname : new FormControl("" , Validators.required),
    lname : new FormControl("", Validators.required),
    username : new FormControl("" , Validators.required),
    email : new FormControl("" , [Validators.required , Validators.pattern("[a-zA-Z0-9]+@+[a-z]+\.+[a-z]{2,3}")]),
    password : new FormControl("" , [Validators.required , Validators.minLength(8)]),
    primaryPhone : new FormControl("" , [Validators.required , Validators.minLength(11),
                  Validators.maxLength(11) , Validators.pattern("[01]+[0-9]{9}")]),
    otherPhone :  new FormControl("", [Validators.minLength(11), Validators.maxLength(11) ,
                                       Validators.pattern("[01]+[0-9]{9}")])
  })

  ngOnInit(): void {
  }

  create(fname, lname, uname, email, password, pPhone, oPhone){
    this.valid = true;
    for(const k of Object.keys(this.validations.controls)){
      if(!this.validations.controls[k].valid)
        {this.valid = false;
         break;}
    }
    if(this.valid){
      this.user.firstName = fname;
      this.user.lastName = lname;
      this.user.username = uname;
      this.user.emailAddress = email;
      this.user.password = password;
      this.user.primaryPhoneNumber = pPhone;
      this.user.otherPhoneNumber = oPhone;
      this.service.post(this.user, "users").subscribe(
        res =>{
          this.router.navigate(['/home/users']);
        },
        err =>{ console.log(err);}
      );
    }

    else{
      alert("Please fill in fields with correct data");
    }
  }

  userActivity(event){
    this.user.active= event.value;
    console.log(event.value);
  }

}
