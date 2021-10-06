import { Component, OnInit } from '@angular/core';
import { ProductdataService } from '../services/productdata.service';
import {Products} from '../products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  products: Products[] = [];
  constructor(private proddata:ProductdataService, private router:Router) { }

  ngOnInit() {
    this.proddata.getlist().subscribe((data)=>{
      this.products = data;
    })
  }

  deleteproduct(id){
    if(confirm('Delete this item?')){
      this.proddata.deleteitem(id).subscribe((data)=>{
        this.products = data;
      })
    }
  }

}
