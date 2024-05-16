import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './module/product/component/category/category.component';
import { RegisterComponent } from './module/authentication/register/register.component';
import { NavbarComponent } from './module/layout/app-layout/navbar/navbar.component';

import { LoginComponent } from './module/authentication/login/login.component';

import { SecuredComponent } from './module/authentication/secured/secured.component';

import { authenticationGuard } from './module/authentication/_guard/authentication.guard';
import { AppLayoutComponent } from './module/layout/app-layout/app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./module/layout/layout.module').then(m => m.LayoutModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
