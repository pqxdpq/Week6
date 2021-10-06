import { Component, OnInit ,ComponentFactoryResolver} from '@angular/core';
import { ProductdataService } from '../services/productdata.service';
import { Products } from '../products';
import {FormsModule} from '@angular/forms';
import { trigger,state, style, animate, transition } from '@angular/animations';
import { ObjectId } from 'bson';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  animations:[
    trigger('iderrorState',[
      state('show',style({
        opacity:1,
        display:'block'
      })),
      state('hide',style({
        opacity:0,
        display:'none'
      })),
      transition('show=>hide', animate('1000ms ease-out')),
      transition('hide=>show', animate('400ms ease-in')),
    ]),
    trigger('noticeState',[
      state('show', style({
        opacity:1,
        display:'block'
      })),
      state('hide',style({
        opacity:0,
        display:'none'
      })),
      transition('show=>hide', animate('1000ms ease-out')),
      transition('hide=>show', animate('400ms ease-in')),
    ])
  ]
})
export class UpdateProductComponent implements OnInit {
  product: Products[] = [];

  constructor(private proddata:ProductdataService,private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.proddata.getitem(this._Activatedroute.snapshot.paramMap.get("product._id")).subscribe((data)=>{
      this.product = data;
        console.log(this.product)
        this.productid = this.product[0].id;
        this.productname = this.product[0].name;
        this.productdesc = this.product[0].description;
        this.productprice = this.product[0].price;
        this.productunits = this.product[0].units;
        this.productobjid = this._Activatedroute.snapshot.paramMap.get("product._id");
    })
  }
  productname:string = "";
  productdesc:string = "";
  productprice:number = null;
  productunits:number = null;
  productid:number = null;
  productobjid:string = "";
  newprod:Products;
  newProductMessage="";

  updateProduct(event){
    event.preventDefault();
      this.newprod = new Products(this.productobjid, this.productid, this.productname, this.productdesc, this.productprice, this.productunits);
      this.proddata.updateitem(this.newprod).subscribe((data)=>{
        console.log(data);
      });
    }
  }
