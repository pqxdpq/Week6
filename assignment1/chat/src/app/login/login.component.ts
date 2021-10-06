import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../chat';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";
  errormessage = "";

  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("role");
  }

  LoginClicked(){
    this._commonService.login(this.username, this.password).subscribe((data)=>{
      if(data.err == null){
        sessionStorage.setItem("id",data.data[0]._id);
        sessionStorage.setItem("username",this.username);
        sessionStorage.setItem("role",data.data[0].role);
        this.router.navigate(['chat']);
      }else{
        this.errormessage = "Username or password incorrect!";
      }
    })
  }

}
