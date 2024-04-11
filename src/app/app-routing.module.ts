import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './module/product/component/category/category.component';
import { RegisterComponent } from './module/authentication/register/register.component';

import { LoginComponent } from './module/authentication/login/login.component';

import { SecuredComponent } from './module/authentication/secured/secured.component';

import { authenticationGuard } from './module/authentication/_guard/authentication.guard';

const routes: Routes = [
  { path: "category", component: CategoryComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },

  { path: 'secured', component: SecuredComponent, canActivate: [authenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
