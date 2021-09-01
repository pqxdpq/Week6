import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  errorMessage = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }

  someArray: Array<string>[] = [
    ['amy@gmail.com', 'amypass'],
    ['bill@gmail.com', 'billpass'],
    ['can@gmail.com', 'canpass']
];

  LoginClicked() {
    for (var i = 0; i < this.someArray.length; i++){
      if (this.email == this.someArray[i][0] && this.password == this.someArray[i][1]){
        this.router.navigate(['account']);          
      }
    }this.errorMessage = "Incorrect";
      
  }

}
