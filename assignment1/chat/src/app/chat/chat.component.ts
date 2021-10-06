import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    messagecontent:string="";
    messages:any[] = [];
    ioConnection:any;
    username = sessionStorage.getItem('username');
    srole:boolean;
    grole:boolean;
    arole:boolean;
    groups: string[] = [];
    rooms: string[] = [];
    curroom: string;
    curgroup:string;
    newgroupname:string="";
    newroomname:string="";
    users:string[] = [];
    authlist= [];
    
  constructor(private socketService:SocketService,private router: Router,private _commonService: CommonService) { }

  ngOnInit() {
    this.initIoConnection();
    this.getAuth();
  }

  private getAuth(){
    console.log("run getauth")
    this._commonService.getauthlist(this.username).subscribe((data)=>{
      this.authlist = data[0].authcode;
      this.getGroups();
    })
  }

  private getGroups(){
    console.log("run getgroups")
    console.log(this.authlist)
    for(let x in this.authlist){
      this._commonService.getgrouplist(x).subscribe((data)=>{
          console.log(data)
      })
    }
  }

  private initIoConnection(){
  this.socketService.initSocket();
  this.ioConnection = this.socketService.onMessage('newroom')
  .subscribe((message:string) => {
  //add new message to the messages array.
  this.messages.push(message);
});
}
  private chat() {
    if(this.messagecontent) {
    // chek there is a message to send
    this.socketService.send(this.messagecontent,this.username);
    console.log(this.username + " says " + this.messagecontent, ' in ',this.curroom);
    this.messagecontent=null;
    }else{
      console.log("no message");
}
}

  private changeroom(val){
    console.log(this.users);
    this.messages = [];
    this.curroom = val;
    this.socketService.chgRoom(this.curroom)
    .subscribe(([message, name]) => {
    //add new message to the messages array.
    this.messages.push([message, name]);
    });
  }

  private logout(){
    sessionStorage.setItem('role','');
    sessionStorage.setItem('username', '');
    this.router.navigate(['login']); 
  }
}