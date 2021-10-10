import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
const SERVER_URL = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }
  public initSocket(){
  this.socket = io(SERVER_URL);
  return ()=>{this.socket.disconnect();}
  }
  public chgRoom(somedata): Observable<any> {
    this.socket.emit('passdata', somedata);
    let observable = new Observable(observer=>{
    this.socket.on(somedata, (data:[string, string]) => observer.next(data));
    });
    return observable;
    }
    
  public levRoom(room){
    this.socket.emit('leave',room);
    console.log('user left ', room)
  }

  public send(message: string, name:string): void {
  this.socket.emit('message', [message,name]);
  }
  public onMessage(somedata): Observable<any> {
  let observable = new Observable(observer=>{
  this.socket.on(somedata, (data:[string, string]) => observer.next(data));
    console.log('recieve msg from onmessage',somedata)
  });
  return observable;
  }
}
