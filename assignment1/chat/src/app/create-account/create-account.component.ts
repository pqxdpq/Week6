import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { LoginComponent } from '../login/login.component';
import { CommonService } from '../services/common.service';
import { User } from '../chat';
import { group } from '@angular/animations';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  user : User;
  newuser:any;
  userArray: any = [];
  authArray: any;
  groupArray: any;
  roomArray: any;
  curusergroup: Array<any>[] = [];
  curuserroom:Array<string>[] = [];
  curusername:string = sessionStorage.getItem('username');
  curuserrole = sessionStorage.getItem("role");
  username:string = "";
  email:string ="";
  password:string="";
  role:string="";
  newname:string='';
  avaliablegroupArray: Array<any>[] = [];
  avaliableroomArray: Array<any>[] = [];
  deletecheck:boolean = false;

  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    this.checkuserloggedin();
    this.getarray();
  }

  private deletecheckfc(){
    this.deletecheck = true;
  }

  private confirmdel(){
    if (this.username != "" && this.deletecheck == true){
      this._commonService.removeuser(this.username).subscribe((data)=>{
        this.getarray();
      })
    }
    this.username = "";
    this.email = "";
    this.password = "";
    this.role = "";
    this.deletecheck = false;
    this.curusergroup = [];
    this.curuserroom = [];
    this.avaliablegroupArray = [];
    this.avaliableroomArray = [];
  }

  private getarray(){
    this.userArray= [];
    this.roomArray = [];
    this.groupArray = []
    this._commonService.getuser().subscribe((data)=>{
      for (let x in data){
        this.userArray.push(data[x]);
      }
    })
    this._commonService.getlist("Room").subscribe((data)=>{
      {
        this.roomArray = data
        console.log(this.roomArray)
      }
    })
    this._commonService.getlist("Group").subscribe((data)=>{
      {
        this.groupArray = data
        console.log(this.groupArray)
      }
    })
  }

  private chat(){
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
    for(let i of this.userArray){
      if(i.username == user.username){
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
      }
    }
    this._commonService.getauth(user.username).subscribe((data)=>{
      this.authArray = data[0].authcode
      console.log(this.authArray);
      for(let x of this.groupArray){
        if(this.authArray.some(v=>v === x.id)){
          this.curusergroup.push([x.groupname, x.id])
        }else{
          this.avaliablegroupArray.push([x.groupname, x.id])
        }
      }
      for(let i of this.roomArray){
        if(this.authArray.some(v=>v === i.id)){
          this.curuserroom.push([i.parentgroup, i.roomname, i.id])
        }else{
          for(let x in this.curusergroup){
            if(this.curusergroup[x].includes(i.parentgroup)){
              this.avaliableroomArray.push([i.parentgroup, i.roomname, i.id])
            }
          }
        }
      }
    })
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
    //save user details
    if (this.role == ""){
      alert('please select role');
      return;
    }
    if (this.validateEmail(this.email)){
      var cfps = (<HTMLInputElement>document.getElementById("cfpassword")).value;
      if (this.password == cfps){ 
            this.newuser = new User("", this.username, this.email, this.password, this.role)
            this._commonService.updateuser(this.newuser).subscribe((data)=>{
              console.log(data);
            })
            //savechange2 is for auth code
            this.savechange2();
            return; 
      }else(alert('password not ok'));
    }else{alert('email is not valid')}  
  }

  private savechange2(){
    console.log("22222")
    this._commonService.updateuauth(this.username, this.authArray).subscribe((data)=>{
      console.log(data);
    })
  }

  private adduser(){
    this.avaliablegroupArray = []
    if (this.newname.includes(' ')){
      console.log('includes space')
      return;
    }else{
      for (let i of this.groupArray){
        this.avaliablegroupArray.push([i.groupname,i.id])
      }
      this.username = this.newname;
      this.newname = "";
      this.email = 'newuser@gmail.com';
      this.password = 'newuserps';
      this.role = 'user';
      this.authArray = [];
      this.curusergroup = [];
      this.curuserroom = [];
      this.newuser = new User("", this.username, this.email, this.password, this.role)
      this._commonService.adduser(this.newuser).subscribe((data=>{
        this.getarray();
      }))
    }
    this.deletecheck = false;
  }

  private addtogroup(gp){
    this.authArray.push(gp[1]);
    this.curusergroup.push(gp);
    this.avaliablegroupArray = this.avaliablegroupArray.filter(item => item[1] !== gp[1]);
    this.checkauth(gp)
  }

  private addtoroom(rm){
    this.authArray.push(rm[2]);
    this.curuserroom.push(rm);
    this.avaliableroomArray = this.avaliableroomArray.filter(item => item[2] !== rm[2]);
    console.log(this.authArray)
  }

  private removefromroom(array){
    this.authArray = this.authArray.filter(item => item !== array[2]);
    this.curuserroom = this.curuserroom.filter(item => item[2] !== array[2]);
    this.avaliableroomArray.push(array);
    console.log(this.authArray)
  }

  private removefromgroup(array){
    this.avaliablegroupArray.push(array);
    this.curusergroup = this.curusergroup.filter(item => item[1] !== array[1]);
    this.authArray = this.authArray.filter(item => item !== array[1]);
    this.checkauth(array);
  }

  private checkauth(array){
    let checkrmarray = this.roomArray.map(d => d.parentgroup == array[0])
    let rmcode = []
    for(let i in checkrmarray){
      if(checkrmarray[i] == true){
        rmcode.push(+i);
      }
    }
    this.checkauthadd(rmcode);
    console.log(rmcode)
  }

  private checkauthadd(rmcode){
    for(let i of rmcode){
      this.curuserroom.push(this.roomArray[i][1],this.roomArray[i][2],this.roomArray[i][3])
    }
    this.curuserroom = [];
    this.avaliableroomArray = [];
    for(let i of this.roomArray){
      if(this.authArray.some(v=>v === i.id)){
        this.curuserroom.push([i.parentgroup, i.roomname, i.id])
      }else{
        for(let x in this.curusergroup){
          if(this.curusergroup[x].includes(i.parentgroup)){
            this.avaliableroomArray.push([i.parentgroup, i.roomname, i.id])
          }
        }
      }
    }
  }

}
