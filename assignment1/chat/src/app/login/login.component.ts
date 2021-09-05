import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  email = "";
  password = "";
  role = "";
  errormessage = "";

  userArray: Array<string>[] = [
    ['sadmin', 'admin@gmail.com', 'sadmin', 'sadmin'],
    ['gadmin','gadmin@gmail.com', 'gadmin', 'gadmin'],
    ['aadmin','aadmin@gmail.com', 'aadmin', 'aadmin'],
    ['user1', 'user1@gmail.com', 'user1', 'user'],
    ['user2', 'user2@gmail.com', 'user2', 'user'],
    ['user3', 'user3@gmail.com', 'user3', 'user']
];


  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    this.checkuserloggedin();
    this.checkuserarray();
  }

  checkuserarray(){
    if(sessionStorage.getItem('userarray')== null){
      return;
    }else{
      this.userArray = JSON.parse(sessionStorage.getItem('userarray'));
    }
  }

  LoginClicked() {
    for (var i = 0; i < this.userArray.length; i++){
      if (this.username == this.userArray[i][0] && this.password == this.userArray[i][2]){
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("role", this.userArray[i][3]);
        if (this.userArray[i][3] == 'sadmin'||this.userArray[i][3] == 'gadmin'||this.userArray[i][3] == 'aadmin')
        this._commonService.shareduserarray = this.userArray;
        sessionStorage.setItem('userarray', JSON.stringify(this.userArray));
        this.router.navigate(['chat']);         
      }
    }this.errormessage = "Incorrect";
    
}
  private checkuserloggedin(){
    if(sessionStorage.getItem('username')!= ''){
      sessionStorage.setItem('username','');
    }
  }

}
