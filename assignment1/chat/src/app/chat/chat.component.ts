import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    messagecontent:string="";
    messages:string[] = [];
    ioConnection:any;
    username = sessionStorage.getItem('username');
    //role = sessionStorage.getItem('role');
    groups: string[] = [];
    rooms: string[] = [];
    

    //group array
    groupArray: Array<any>[] = [
      ['Group aus', 1],
      ['Apex',2],
      ['Hunting',3],
      ['Basketball', 4]
    ];

    //room array
    roomArray: Array<any>[] = [
      ['Group aus','Animals', 5],
      ['Group aus','Plants', 6],
      ['Apex','aiming',7],
      ['Apex','patch_notes',8],
      ['Hunting','places',9],
      ['Basketball','players', 10],
      ['Basketball','game', 11],
      ['Basketball','stream', 12]
    ];

    //A list of which users are in each group and rooms. 
    authArray: Array<Array<any>[]> = [
      [['sadmin'],[1,2,3,4,5,6,7,8,9,10,11,12]],
      [['gadmin'],[1,2,3,4,5,6,7,8,9,10,11,12]],
      [['aadmin'],[1,2,3,4,5,6,7,8,9,10,11,12]],
      [['user1'],[1,2,3,4,5,6,7,8,9,10,11,12]],
      [['user2'],[1,2,3,4,5,6,7,8,9,10,11,12]],
      [['user3'],[1,2,3,4,5,6,7,8,9,10,11,12]]
    ];
    
  constructor(private socketService:SocketService) { }

  ngOnInit() {
    this.initIoConnection();
    console.log(this.username);
    this.displaygroup();
    localStorage.setItem('groups', JSON.stringify(this.groups));
    console.log(this.groups);
  }

  private displaygroup(){
    var uservar;
    for(let i in this.authArray){
      //find the accessable groups and rooms for current user
      if (this.username = this.authArray[i][0][0]){
        uservar = i;
      }
    }
    for(let x in this.authArray[uservar][1]){
      for(let y in this.groupArray){
        if(this.authArray[uservar][1][x] == this.groupArray[y][1]){
          this.groups.push(this.groupArray[y][0]);
          }
        }         
      }
    }

  private displayroom(groupname){
    this.rooms.length = 0;
    var uservar;
    console.log(groupname);
    for(let i in this.authArray){
      //find the accessable groups and rooms for current user
      if (this.username = this.authArray[i][0][0]){
        uservar = i;
      }
    }
    for(let x in this.authArray[uservar][1]){
      for(let y in this.roomArray){
        if(this.authArray[uservar][1][x] == this.roomArray[y][2]){
          if(groupname == this.roomArray[y][0]){
              this.rooms.push(this.roomArray[y][1]);
            }
          }
        }         
      }
      console.log(this.rooms);
    }

  private initIoConnection(){
  this.socketService.initSocket();
  this.ioConnection = this.socketService.onMessage()
  .subscribe((message:string) => {
  //add new message to the messages array.
  this.messages.push(message);
});
}
  private chat() {
    if(this.messagecontent) {
    // chek there is a message to send
    this.socketService.send(this.messagecontent);
    console.log(this.username + " says " + this.messagecontent);
    this.messagecontent=null;
    }else{
      console.log("no message");
}
}
}