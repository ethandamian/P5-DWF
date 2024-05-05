import { Component, isStandalone } from '@angular/core';
import { SwalMessages } from '../../../commons/_dto/swal-message';
import { DtoInvoiceList } from '../../_dto/dto-invoice-list';
import { InvoiceService } from '../../_service/invoice.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

declare var $: any; // JQuery

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
  providers: [DatePipe, CurrencyPipe]
})

export class InvoiceComponent {

  invoices: DtoInvoiceList[] = []; // Invoice list

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private invoiceService: InvoiceService,
  ){}

  ngOnInit(){
    this.getInvoices();
  }

  getInvoices(){
    this.invoiceService.getInvoices().subscribe({
      next: (v) => {
        this.invoices = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}

