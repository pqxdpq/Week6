import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../services/productdata.service';
import {Products} from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productcount = 0;
  constructor(private proddata:ProductdataService, private router:Router) { }

  ngOnInit() {
    this.proddata.getproductcount().subscribe((data)=>{
      this.productcount = data.count;
      console.log(data);
    })
  }

}
