import { Component } from '@angular/core';
import { InvoiceService } from '../../_service/invoice.service';
import { Location } from '@angular/common';
import { Invoice } from '../../_model/invoice';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalMessages } from '../../../commons/_dto/swal-message';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'

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
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.rol !== 'ADMIN') {
        this.router.navigate(['/']);
      }
    }


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

  getTotal() {
    let sum = 0;
    this.invoiceDetails.items.forEach((item) => {
      sum += item.total;
    });
    return sum;
  }

  generatePDF() {
    const data = document.getElementById('invoice-details');
    if (data) {
      html2canvas(data, { height: 1550 }).then(canvas => {
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('p', 'mm', 'legal');
        const contentDataURL = canvas.toDataURL('image/png');
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('invoice.pdf');
      });
    }
  }


}
