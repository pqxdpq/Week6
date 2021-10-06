import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { Wk5loginComponent } from './wk5login/wk5login.component';
import { Wk5accountComponent } from './wk5account/wk5account.component';
import { Wk5profileComponent } from './wk5profile/wk5profile.component';


const routes: Routes = [{path: 'login', component: LoginComponent}, {path: 'account', component: AccountComponent},{path: 'wk5login', component: Wk5loginComponent},{path:'wk5account', component:Wk5accountComponent}, {path:'wk5profile', component:Wk5profileComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
