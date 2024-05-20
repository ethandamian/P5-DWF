import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../_service/cart.service';
import { DtoCartDetails } from '../../_dto/dto-cart-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart: DtoCartDetails[] = [];

  constructor(
    private location: Location,
    private cartService: CartService
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

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id).subscribe({
      next: (v) => {
        this.getCart();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }
}
