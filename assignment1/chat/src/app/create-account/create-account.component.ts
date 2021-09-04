import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  userArray: Array<string>[];

  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    this.getuserarray();
  }

  private getuserarray(){
    this.userArray = JSON.parse(sessionStorage.getItem('userarray'));
    console.log(this.userArray);
  }

  private chat(){
    this.router.navigate(['chat']); 
  }

  private logout(){
    sessionStorage.setItem('role','');
    sessionStorage.setItem('username', '');
    this.router.navigate(['login']); 
  }
  

}
