import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { RouterModule } from '@angular/router';
import { AppLayoutRoutes } from './app-layout/app-layout.routing';
import { NavbarComponent } from './app-layout/navbar/navbar.component';
import { ProductModule } from '../product/product.module';
import { AuthenticationModule } from '../authentication/authentication.module';



@NgModule({
  declarations: [
    AppLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AppLayoutRoutes),
    ProductModule,
    AuthenticationModule
  ]
})
export class LayoutModule { }
