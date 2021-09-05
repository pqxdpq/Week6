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
  groupArray: Array<any>[];
  roomArray: Array<any>[];
  curusername:string = sessionStorage.getItem('curusername');
  username:string = "";
  email:string ="";
  password:string="";
  role:string="";
  newname:string='';
  deletecheck:boolean = false;

  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    this.checkuserloggedin();
    this.getarray();
    console.log('auth',this.authArray);
    console.log('group',this.groupArray);
    console.log('room',this.roomArray);
    console.log('user',this.userArray);
  }

  private deletecheckfc(){
    this.deletecheck = true;
  }

  private confirmdel(){
    if (this.username != "" && this.deletecheck == true){
      for(let i in this.userArray){
        if(this.userArray[i][0] == this.username){
          console.log('got name', this.userArray[i][0])
          this.userArray.splice(Number(i),1);
          sessionStorage.setItem('userarray', JSON.stringify(this.userArray));  
        }
      }
      for(let i in this.authArray){
        if(this.authArray[i][2][0] == this.username){
          this.authArray.splice(Number(i),1);
          this.username = '';
          this.email = '';
          this.password = '';
          this.role = '';
        }
      }
    }
  }

  private getarray(){
    this.userArray = JSON.parse(sessionStorage.getItem('userarray'));
    this.authArray = JSON.parse(sessionStorage.getItem('autharray'));
    this.groupArray = JSON.parse(sessionStorage.getItem('gparray'));
    this.roomArray = JSON.parse(sessionStorage.getItem('rmarray'));
  }

  private chat(){
    sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
    sessionStorage.setItem('userarray', JSON.stringify(this.userArray));
    this.router.navigate(['chat']); 
  }

  private logout(){
    sessionStorage.setItem('role','');
    sessionStorage.setItem('username', '');
    this.router.navigate(['login']); 
  }
  
  private selectuser(user){
    this.deletecheck =false;
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

  private checkuserloggedin(){
    if(this.curusername == ''){
      sessionStorage.setItem('username','');
      this.router.navigate(['login']); 
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
        }
        this.userArray.push([this.username, this.email, this.password, this.role]);   
        //sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
        sessionStorage.setItem('userarray', JSON.stringify(this.userArray));  
      }
    }
    
  }

  private adduser(){
    if (this.newname.includes(' ')){
      console.log('includes space')
      return;
    }else{
      this.username = this.newname;
      this.email = 'newuser@gmail.com';
      this.password = 'newuserps';
      this.role = 'user';
    }
    this.deletecheck = false;
  }

}
