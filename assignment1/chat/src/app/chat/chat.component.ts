import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import {Message} from '../chat';

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
    rooms: any[] = [];
    curroom: string;
    curroomid: number;
    curgroup:string;
    newgroupname:string="";
    newroomname:string="";
    users:string[] = [];
    authlist= [];
    
  constructor(private socketService:SocketService,private router: Router,private _commonService: CommonService) { }

  ngOnInit() {
    this.initIoConnection();
    this.getAuth();
    this.checkrole();
    sessionStorage.getItem("username")
  }

  private checkrole(){
    let currole = sessionStorage.getItem("role");
    if (currole == "sadmin"){
      this.srole = true;
    }else if(currole == "gadmin"){
      this.grole = true;
    }else if (currole == "aadmin"){
      this.arole = true;
    }
  }

  private getAuth(){
    console.log("run getauth")
    this._commonService.getauth(this.username).subscribe((data)=>{
      this.authlist = data[0].authcode;
      this.getGroups();
    })
  }

  private getGroups(){
    console.log("run getgroups")
    for(let x in this.authlist){
      this._commonService.getgroups(this.authlist[x]).subscribe((data)=>{
        if(data.length){
          this.groups.push(data[0].groupname)
        }
      })
    }  
  }

  private displayroom(groupname){
    this.rooms = [];
    this._commonService.getroom(groupname).subscribe((data)=>{
      for(let x in data){
        this.rooms.push([data[x].roomname, data[x].id]);
      }
    })
  }

  private message(id, username, msg){
    let dateTime = new Date();
    let newmessage = new Message("", id, username, msg, dateTime)
    this._commonService.message(newmessage).subscribe((data)=>{
      console.log('sent');
    })
  }

  private getmessage(roomid){
    this._commonService.getmessage(roomid).subscribe((data)=>{
      for (let x in data){
        this.messages.push([data[x].message,data[x].sender]);
      }
    })
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
    this.message(this.curroomid, this.username, this.messagecontent);
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
    this.messages = [];
    this.getmessage(val[1]);
    this.curroom = val[0];
    this.curroomid = val[1];
    this.socketService.chgRoom(this.curroom)
    .subscribe(([message, name]) => {
    //add new message to the messages array.
    this.messages.push([message, name]);
    });
  }

  //private addGroup(){
    //this._commonService.addgroup(this.newgroupname)
  //}

  private logout(){
    sessionStorage.setItem('role','');
    sessionStorage.setItem('username', '');
    this.router.navigate(['login']); 
  }
}