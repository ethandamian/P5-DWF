import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  cart: boolean = false;

  recieveCart(event: boolean){
    if(event){
      this.cart = true;
    }
  }

}
