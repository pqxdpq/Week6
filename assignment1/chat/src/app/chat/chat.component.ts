import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { element } from '@angular/core/src/render3';

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
    curusername = sessionStorage.setItem('curusername', this.username);
    itself:boolean;
    srole:boolean;
    grole:boolean;
    arole:boolean;
    auth= sessionStorage.getItem('role');
    groups: string[] = [];
    rooms: string[] = [];
    curroom: string;
    curgroup:string;
    newgroupname:string="";
    newroomname:string="";
    users:string[] = [];

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
      [['sadmin'],[1,2,3,4,5,6,7,8,9,10,11,12],['sadmin']],
      [['gadmin'],[1,2,3,4,5,6,7,8,9,10,11,12],['gadmin']],
      [['aadmin'],[1,2,3,4,5,6,7,8,9,10,11,12],['aadmin']],
      [['user'],[1,2,4,5,6,7,8,10,11,12],['user1']],
      [['user'],[1,2,4,5,6,7,8,10,11,12],['user2']],
      [['user'],[1,2,4,5,6,7,8,10,11,12],['user3']]
    ];
    largest = this.authArray[0][1][0];
    
  constructor(private socketService:SocketService,private router: Router) { }

  ngOnInit() {
    this.checkuserloggedin();
    this.checkauth();
    this.initIoConnection();
    console.log(this.username);
    this.displaygroup();
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  updateautharray(){
    if(sessionStorage.getItem('autharray')){
      this.authArray = JSON.parse(sessionStorage.getItem('autharray'));
    }
    
  }

  checkauth(){
    if(this.auth == 'sadmin'){
      this.srole = true;
    }
    if(this.auth == 'gadmin'){
      this.grole = true;
    }
    if(this.auth == 'aadmin'){
      this.arole = true;
    }
  }

  account(){
    if(this.auth == 'sadmin' ||this.auth == 'gadmin'||this.auth == 'aadmin'){
      sessionStorage.setItem('autharray', JSON.stringify(this.authArray));
      sessionStorage.setItem('gparray', JSON.stringify(this.groupArray));
      sessionStorage.setItem('rmarray', JSON.stringify(this.roomArray));
      this.router.navigate(['createac']);
    }
  }

  getlargest(){
    for (var i=0; i<this.authArray[0][1].length;i++){
      if (this.largest <= this.authArray[0][1][i]){
        this.largest = this.authArray[0][1][i]+1;
      }
  }
  }

  private displaygroup(){
    this.groups.length = 0;
    var uservar;
    for(let i in this.authArray){
      //find the accessable groups and rooms for current user
      if (this.username == this.authArray[i][2][0]){
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
    this.curgroup = groupname;
    this.rooms.length = 0;
    var uservar;
    for(let i in this.authArray){
      //find the accessable groups and rooms for current user
      if (this.username == this.authArray[i][2][0]){
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
    this.getusers(val);
    console.log(this.users);
    this.messages = [];
    this.curroom = val;
    this.socketService.chgRoom(this.curroom)
    .subscribe(([message, name]) => {
    //add new message to the messages array.
    this.messages.push([message, name]);
    });
  }

  private checkuserloggedin(){
    if(sessionStorage.getItem('username')){
      //
    }else{
      this.router.navigate(['login']); 
    }
  }

  private pushNumToAuth(num){
    for(let i in this.authArray){
      if(this.authArray[i][0][0] == "sadmin" || this.authArray[i][0][0] == "gadmin" || this.authArray[i][0][0] == "aadmin"){
        this.authArray[i][1].push(num);
      }
    }
  }

  private addGroup(){
    for(let i in this.groupArray){
      if(this.groupArray[i][0] == this.newgroupname){
        console.log('name used!');
        return;
      }
    }
    console.log('got there')
    this.getlargest();
    var gpnum = this.largest;
    this.groupArray.push([this.newgroupname,gpnum]);
    this.pushNumToAuth(gpnum);
    this.displaygroup();
  }

  private addRoom(){
    for(let i in this.roomArray){
      if(this.roomArray[i][0] == this.curgroup && this.roomArray[i][1] == this.newroomname){
        console.log('name used!');
        return;
      }
    }
    if(this.curgroup != undefined){
      this.getlargest();
      var roomnum = this.largest;
      this.roomArray.push([this.curgroup,this.newroomname,roomnum]);
      this.pushNumToAuth(roomnum);
      this.displayroom(this.curgroup);
      console.log(this.rooms);
      console.log(this.roomArray);
    }
  }

  getGpRmIDByname(val){
    for(let i in this.groupArray){
      console.log(this.groupArray[i][0], val)
      if (this.groupArray[i][0][0] == val){
        console.log('found',this.groupArray[i][0][0])
        return this.groupArray[i][1];
      }
    }
    for(let i in this.roomArray){
      if (this.roomArray[i][1]== val){
        console.log('found',this.roomArray[i][1][0])
        return this.roomArray[i][2];
      }
    }
  }

  private logout(){
    sessionStorage.setItem('role','');
    sessionStorage.setItem('username', '');
    this.router.navigate(['login']); 
  }

  private getusers(rm){
    this.users= [];
    var rmid = this.getGpRmIDByname(rm)
    ///console.log(rmn)
    for(let i in this.authArray){
        console.log(this.authArray[i][1],rmid)
        if (this.authArray[i][1].includes(rmid)){
          this.users.push(this.authArray[i][2][0]);
          console.log(this.authArray[i][2][0])
        }
    }
  }

  private rmgroup(name){
    var id = this.getGpRmIDByname(name);
    for (let i = 0; i <this.roomArray.length;i++){
      if (this.roomArray[i][0] == name){
        this.rmroom(this.roomArray[i][1]);
      }
    }
    for (let i in this.groupArray){
      if(this.groupArray[i][0] == name){
        this.groupArray.splice(Number(i),1);
      }
    }
  }

  private rmroom(name){
    var id = this.getGpRmIDByname(name);
    for (let i in this.roomArray){
      if(this.curgroup == this.roomArray[i][0] && name == this.roomArray[i][1]){
        for(let x in this.authArray){
          this.authArray[x][1].forEach((element, index)=>{
            if(element == id)this.authArray[x][1].splice(index,1);
            this.displayroom(this.curgroup);
            console.log('doing')
          });
        }
      }
    }
    for(let x in this.roomArray){
      if(this.roomArray[x][2] == id){
        this.roomArray.splice(Number(x), 1);
      }
    }
  }
}