import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public shareduserarray: Array<string>[];
  constructor() { }
}
