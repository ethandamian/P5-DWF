import { Component } from '@angular/core';
import { InvoiceService } from '../../_service/invoice.service';
import { Location } from '@angular/common';
import { Invoice } from '../../_model/invoice';
import { ActivatedRoute } from '@angular/router';
import { SwalMessages } from '../../../commons/_dto/swal-message';

@Component({
  selector: 'invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})
export class InvoiceDetailsComponent {

  swal: SwalMessages = new SwalMessages();

  invoiceDetails: Invoice = new Invoice();
  invoiceId: number = 0;
  folio: string = ''; // folio


  constructor(
    private invoiceService: InvoiceService,
    private location: Location,
    private rutaActiva: ActivatedRoute
  ) { }

  ngOnInit() {
    this.invoiceId = this.rutaActiva.snapshot.params['id'];
    this.folio = this.generateRandomString(10);
    this.invoiceService.getInvoice(this.invoiceId).subscribe({
      next: (v) => {
        this.invoiceDetails = v.body!;
        console.log(this.invoiceDetails);
      },
      error: (e) => {
        this.swal.errorMessage('Error loading invoice details.');
      }

    });


  }

  goBack() {
    this.location.back();
  }

  generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;

    // Generate a random position for the hyphen
    const hyphenPosition = Math.floor(Math.random() * length);

    for (let i = 0; i < length; i++) {
      if (i === hyphenPosition) {
        result += '-';
      } else {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    }
    return result;
  }

}
