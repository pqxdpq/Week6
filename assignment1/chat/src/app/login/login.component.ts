import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  email = "";
  password = "";
  role = "";
  errormessage = "";

  constructor(private router: Router, private _commonService: CommonService) {
   }

  ngOnInit() {
    
  }


}
