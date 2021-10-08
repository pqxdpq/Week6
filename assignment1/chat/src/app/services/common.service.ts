import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Group} from '../chat';
import {Room} from '../chat';
import {User} from '../chat';
import {Message} from '../chat';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  addgroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/addgroup', group);
  }

  addroom(room:Room){
    return this.http.post<any>('http://localhost:3000/api/addroom', room);
  }

  adduser(user:User){
    return this.http.post<any>('http://localhost:3000/api/adduser', user);
  }

  getauth(username){
    return this.http.post<any>('http://localhost:3000/api/getauth',{"username":username});
  }

  updateauth(role,authcode){
    return this.http.post<any>('http://localhost:3000/api/updateauth',{"role":role,"authcode":authcode});
  }

  getgroups(id){
    return this.http.post<any>('http://localhost:3000/api/getgroups',{"id":id});
  }

  getroom(groupname){
    return this.http.post<any>('http://localhost:3000/api/getrooms',{"groupname":groupname});
  }
  
  getlargest(){
    return this.http.get<any>('http://localhost:3000/api/getlargest');
  }

  getmessage(val){
    return this.http.post<any>('http://localhost:3000/api/getmessage',{"roomid":val});
  }

  login(username, password){
    return this.http.post<any>('http://localhost:3000/api/login',{"username":username, "password":password});
  }

  message(message:Message){
    console.log(message)
    return this.http.post<any>('http://localhost:3000/api/message', message);
  }

  removegroup(groupname, id){
    return this.http.post<any>('http://localhost:3000/api/removegroup', {"groupname":groupname, "id":id});
  }

  removeroom(id){
    return this.http.post<any>('http://localhost:3000/api/removeroom', {"id":id});
  }

  removeuser(user:User){
    return this.http.post<any>('http://localhost:3000/api/removeuser', user);
  }
}
