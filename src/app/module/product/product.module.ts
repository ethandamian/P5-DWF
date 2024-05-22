import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './component/product/product.component';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { Product2Component } from './component/product2/product2.component';


@NgModule({
  declarations: [
    ProductComponent,
    CategoryComponent,
    ProductDetailComponent,
    Product2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CategoryComponent
  ]
})
export class ProductModule { }
