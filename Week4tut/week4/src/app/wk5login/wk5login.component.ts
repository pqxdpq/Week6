import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wk5login',
  templateUrl: './wk5login.component.html',
  styleUrls: ['./wk5login.component.css']
})
export class Wk5loginComponent implements OnInit {

  username = "";
  birthdate = "";
  age:number;
  email = "";
  password = "";
  valid: boolean;
  errorMessage = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  someArray: Array<any>[] = [
    ['amy','1998/06/16',23,'amy@gmail.com', 'amypass'],
    ['bill','1996/02/06',25,'bill@gmail.com', 'billpass'],
    ['can','1981/03/21',40,'can@gmail.com', 'canpass']
];

  LoginClicked() {
    for (var i = 0; i < this.someArray.length; i++){
      if (this.email == this.someArray[i][3] && this.password == this.someArray[i][4]){
        sessionStorage.setItem("username", this.someArray[i][0]);
        sessionStorage.setItem("birthdate", this.someArray[i][1]);
        sessionStorage.setItem("age", JSON.stringify(this.someArray[i][2]));
        sessionStorage.setItem("email", this.someArray[i][3]);
        sessionStorage.setItem("valid", JSON.stringify(this.valid = true));
        this.router.navigate(['wk5profile']);          
      }
    }this.errorMessage = "Incorrect";
      
  }

}
