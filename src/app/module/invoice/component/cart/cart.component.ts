import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../_service/cart.service';
import { InvoiceService } from '../../_service/invoice.service';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { SwalMessages } from '../../../commons/_dto/swal-message';

declare var $: any;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart: DtoCartDetails[] = [];
  swal: SwalMessages = new SwalMessages();


  constructor(
    private location: Location,
    private cartService: CartService,
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cart = v.body!;
        console.log(this.cart)

      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  goBack() {
    this.location.back();
  }

  clearCart() {
    this.swal.confirmMessage.fire({
      title: 'Are you sure you want to delete all the products in the cart?',
      icon: 'warning',
      background: '#4d425f',
      color: 'white',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.clearCart().subscribe({
          next: (v) => {
            this.getCart();
            this.cartService.getCount();
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
    
  }

  removeFromCart(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Are you sure you want to delete all the products in the cart?',
      icon: 'warning',
      background: '#4d425f',
      color: 'white',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(id).subscribe({
          next: (v) => {
            this.getCart();
            this.cartService.getCount();
          },
          error: (e) => {
            console.log(e);
          }
        });
      }
    });
  }

  total(): number{
    let total = 0;
    for(let element of this.cart){
      total += element.product.price! * element.quantity!;
    }
    return total;
  }

  showModal() {
    $('#checkoutModal').modal("show");
    $("#checkout-form-title").text("New Category");
    $("#modal-button").text("Add");
  }

  totalProducts(){
    let total = 0;
    for(let element of this.cart){
      total += element.quantity!;
    }
    return total;
  }

  finish(){
    this.swal.confirmMessage.fire({
      title: 'Are you sure to complete the purchase?',
      icon: 'question',
      background: '#4d425f',
      color: 'white',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.invoiceService.generateInvoice().subscribe(
          (res) => {
            this.swal.successMessage('Invoice generated successfully');
            this.cartService.clearCart();
            this.cartService.getCount();
            this.getCart();
          },
          (err) => {
            this.swal.errorMessage('Error generating invoice');
          }
        )
      }
    });
  }
}
