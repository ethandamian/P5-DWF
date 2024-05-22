import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { InvoiceDetailsComponent } from './component/invoice-details/invoice-details.component';



@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InvoiceModule { }
