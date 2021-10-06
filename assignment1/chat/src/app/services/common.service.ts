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

  getauthlist(username){
    console.log("getauthlist")
    return this.http.post<any>('http://localhost:3000/api/getauthlist',{"username":username});
  }

  getgrouplist(id){
    return this.http.post<any>('http://localhost:3000/api/getgrouplist',{"id":id});
  }
  
  getlargest(){
    return this.http.get<any>('http://localhost:3000/api/getlargest');
  }

  getmessage(val){
    return this.http.get<any>('http://localhost:3000/api/getmessage',val);
  }

  login(username, password){
    return this.http.post<any>('http://localhost:3000/api/login',{"username":username, "password":password});
  }

  message(message:Message){
    return this.http.post<any>('http://localhost:3000/api/message', message);
  }

  removegroup(group:Group){
    return this.http.post<any>('http://localhost:3000/api/removegroup', group);
  }

  removeroom(room:Room){
    return this.http.post<any>('http://localhost:3000/api/removeroom', room);
  }

  removeuser(user:User){
    return this.http.post<any>('http://localhost:3000/api/removeuser', user);
  }
}
