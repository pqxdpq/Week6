import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { LoginComponent } from '../login/login.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  userArray: Array<string>[] = [];
  authArray: Array<Array<any>[]>;
  groupArray: Array<any>[];
  roomArray: Array<any>[];
  curusergroup: Array<any>[] = [];
  curuserroom:Array<string>[] = [];
  curusername:string = sessionStorage.getItem('curusername');
  username:string = "";
  email:string ="";
  password:string="";
  role:string="";
  newname:string='';
  avaliablegroupArray: Array<any>[] = [];
  avaliableroomArray: Array<any>[] = [];
  deletecheck:boolean = false;
  curuserrole = sessionStorage.getItem('role');

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
          console.log(this.authArray[i][2][0])
          console.log(this.username)
          console.log(this.authArray[i])
          this.authArray.splice(Number(i),1);
          sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
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
    this.avaliablegroupArray = [];
    this.avaliableroomArray = [];
    this.curusergroup = [];
    this.curuserroom = [];
    for(let i in this.userArray){
      if(this.userArray[i][3]== user[3]){
        this.username = user[0];
        this.email = user[1];
        this.password = user[2];
        this.role = user[3];
      }
    }
    for(let i in this.authArray){
      if(this.authArray[i][2][0] == this.username){
        for(let x in this.authArray[i][1]){
          //group
          for (let g in this.groupArray){
            if(this.authArray[i][1][x] == this.groupArray[g][1]){
              this.curusergroup.push(this.groupArray[g]);
            }
          }
          //room
          for(let t in this.roomArray){
            if(this.authArray[i][1][x] == this.roomArray[t][2]){
              this.curuserroom.push(this.roomArray[t])
            }
          }
        }
        for(let l in this.groupArray){
          if(!(this.authArray[i][1].includes(this.groupArray[l][1]))){
            this.avaliablegroupArray.push(this.groupArray[l])
          }
        }
        for(let p in this.roomArray){
          if(!(this.authArray[i][1].includes(this.roomArray[p][2]))){
            for(let i in this.curusergroup){
              if(this.curusergroup[i].includes(this.roomArray[p][0])){
              this.avaliableroomArray.push(this.roomArray[p]);
              }  
            }                 
          }
        }
      }
    }
    console.log(this.curusergroup);
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
    if (this.role == ""){
      alert('please select role');
      return;
    }
    if (this.validateEmail(this.email)){
      var cfps = (<HTMLInputElement>document.getElementById("cfpassword")).value;
      if (this.password == cfps){
        for(let i in this.userArray){
          if(this.userArray[i][0] == this.username){
            this.userArray[i][1] = this.email;
            this.userArray[i][2] = this.password;
            this.userArray[i][3] = this.role;
            sessionStorage.setItem('userarray', JSON.stringify(this.userArray));  
            this.savechange2();
            console.log('1');
            return;
          }
        }
        this.userArray.push([this.username, this.email, this.password, this.role]); 
        this.savechange2();
        sessionStorage.setItem('userarray', JSON.stringify(this.userArray));  
      }else(alert('password not ok'));
    }else{alert('email is not valid')}  
  }

  private savechange2(){
    for (let i in this.authArray){
      if(this.authArray[i][2][0] == this.username){
        this.authArray[i][0][0] = this.role;
        sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
        console.log('2');
        return;
      }
    }
    this.authArray.push([[this.role], this.authArray, [this.username]]);
    sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
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
      this.curusergroup = [];
      this.curuserroom = [];
    }
    this.deletecheck = false;
  }

  private addtogroup(gp){
    for(let i in this.authArray){
      if (this.authArray[i][2][0] == this.username){
        this.authArray[i][1].push(gp[1]);
        this.selectuser(this.username);
      }
    }
  }

  private addtoroom(rm){
    for(let i in this.authArray){
      if (this.authArray[i][2][0] == this.username){
        this.authArray[i][1].push(rm[2]);
        this.selectuser(this.username);
      }
    }
  }

  private removefromroom(array){
    for(let i in this.authArray){
      if(this.authArray[i][2][0] == this.username){
        this.authArray[i][1].forEach((element, index)=>{
          if(element==array[2]) this.authArray[i][1].splice(index, 1);
        });
      }
    }
    this.selectuser(this.username);
  }

  private removefromgroup(array){
    for(let x in this.curuserroom){
      if (this.curuserroom[x][0] == array[0]){
        alert('Please remove user from related room first.');
        return;
      }
    }
    for(let i in this.authArray){
      if(this.authArray[i][2][0] == this.username){
        this.authArray[i][1].forEach((element, index)=>{
          if(element==array[1]) this.authArray[i][1].splice(index, 1);
        });
      }
    }
    this.selectuser(this.username);
  }

}
