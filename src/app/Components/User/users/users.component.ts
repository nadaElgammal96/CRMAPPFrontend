import { UserDTO } from 'src/app/Model/User/UserCreateDTO';
import { UsersViewDTO } from '../../../Model/User/UsersViewDTO';
import { ApiService } from '../../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users :UsersViewDTO [] = [];
  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.get("users").subscribe(
      res =>{ this.users = res
      console.log(this.users);},
      err => {console.log(err);}
    );
  }

  deleteUser(id){
    let confirmation = confirm("Are you sure you want to delete user?");
    if(confirmation){
      this.service.delete(id , "users").subscribe(
        res =>{
          // window.location.reload();
          this.loadData();
        },
        err => {console.log(err);}
      );
    }
  }

  changeActivation(id){

    let user = new UserDTO();
    this.service.getByParameter(id, "users").subscribe(
      res => {
        user = res;
        let confirmation = confirm(`Are you sure you want to change activation of user ${user.firstName} ${user.lastName}`);
        
        if(confirmation){
    
          this.service.put(id, user , "users" , "changeActivation").subscribe(
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
