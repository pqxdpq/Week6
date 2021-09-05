import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  userArray: Array<string>[];
  authArray: Array<Array<any>[]>;
  username:string = "";
  email:string ="";
  password:string="";
  role:string="";
  newname:string='';
  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    this.getarray();
    console.log(this.userArray)
  }

  private getarray(){
    this.userArray = JSON.parse(sessionStorage.getItem('userarray'));
    this.authArray = JSON.parse(sessionStorage.getItem('autharray'));
  }

  private chat(){
    sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
    this.router.navigate(['chat']); 
  }

  private logout(){
    sessionStorage.setItem('role','');
    sessionStorage.setItem('username', '');
    this.router.navigate(['login']); 
  }
  
  private selectuser(user){
    console.log(user);
    for(let i in this.userArray){
      if(this.userArray[i][3]== user[3]){
        this.username = user[0];
        this.email = user[1];
        this.password = user[2];
        this.role = user[3];
      }
    }
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  private savechanges(){
    if (this.validateEmail(this.email)){
      var cfps = (<HTMLInputElement>document.getElementById("cfpassword")).value;
      if (this.password == cfps){
        for(let i in this.userArray){
          if(this.userArray[i][0] == this.username){
            this.userArray[i][1] = this.email;
            this.userArray[i][2] = this.password;
            this.userArray[i][3] = this.role;
            return;
          }
        }this.userArray.push([this.username, this.email, this.password, this.role]);     
      }
    }
    
  }

  private adduser(){
    this.username = this.newname;
    this.email = 'newuser@gmail.com';
    this.password = 'newuserps';
    this.role = 'user';
  }

}
