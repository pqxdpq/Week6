import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wk5account',
  templateUrl: './wk5account.component.html',
  styleUrls: ['./wk5account.component.css']
})
export class Wk5accountComponent implements OnInit {

  username = sessionStorage.getItem("username");
  birthdate = sessionStorage.getItem("birthdate");
  age:number = JSON.parse(sessionStorage.getItem("age"));
  email = sessionStorage.getItem("email");
  valid: boolean = JSON.parse(sessionStorage.getItem("valid"));

  constructor(private router: Router) { }

  ngOnInit() {
    this.checklogin();
  }

  checklogin(){
    if(this.valid != true){
      this.router.navigate(['wk5login']); 
    }
  }

}
