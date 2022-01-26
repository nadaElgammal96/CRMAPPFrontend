import { ApiService } from '../../../Services/api-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDTO } from 'src/app/Model/User/UserCreateDTO';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  userId;
  user = new UserDTO();
  constructor(private service: ApiService, private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.service.getByParameter(this.userId, "users").subscribe(
      res=>{
        this.user = res;
      },
      err => { console.log(err); }
    )
  }

  update(){
    this.service.put(this.userId , this.user , "users").subscribe(
      res => { 
      this.router.navigate(["/home/users"]);},
      err => {console.log(err);}
    );
  }

}
