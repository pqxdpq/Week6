import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  jsonItem = {};
  public shareduserarray: Array<string>[];

  setItem(key, item){
    this.jsonItem[key] = item;
  }

  getItem(key){
    return this.jsonItem[key];
  }

  constructor() { }
}
