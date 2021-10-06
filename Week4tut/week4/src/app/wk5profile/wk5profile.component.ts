import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wk5profile',
  templateUrl: './wk5profile.component.html',
  styleUrls: ['./wk5profile.component.css']
})
export class Wk5profileComponent implements OnInit {

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

  save(){
    sessionStorage.setItem('username', this.username);
    sessionStorage.setItem('birthdate', this.birthdate);
    sessionStorage.setItem('age', JSON.stringify(this.age));
    sessionStorage.setItem("email", this.email);
    this.router.navigate(['wk5account']);  
  }

}
