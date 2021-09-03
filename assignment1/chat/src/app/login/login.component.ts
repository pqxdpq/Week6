import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkuserloggedin();
  }

  userArray: Array<string>[] = [
    ['sadmin', 'admin@gmail.com', 'sadmin', 'admin'],
    ['gadmin','gadmin@gmail.com', 'gadmin', 'gadmin'],
    ['aadmin','aadmin@gmail.com', 'aadmin', 'aadmin'],
    ['user1', 'user1@gmail.com', 'user1', 'user'],
    ['user2', 'user2@gmail.com', 'user2', 'user'],
    ['user3', 'user3@gmail.com', 'user3', 'user']
];

  LoginClicked() {
    for (var i = 0; i < this.userArray.length; i++){
      if (this.username == this.userArray[i][0] && this.password == this.userArray[i][2]){
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("role", this.userArray[i][3]);
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
