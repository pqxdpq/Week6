import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { HomeComponent } from './home/home.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [{path:"", component:HomeComponent}, {path:"addprod", component:AddProductComponent}, {path:"listprod", component:ListProductsComponent}, {path:"updateprod/:product._id", component:UpdateProductComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
