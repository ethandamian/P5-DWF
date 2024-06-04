import { Component } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  isAdmin: boolean = false;
  cart: boolean = false;

  ngOnInit() {

    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.rol == 'ADMIN') {
        this.isAdmin = true;
      }
    }
  }


  recieveCart(event: boolean) {
    if (event) {
      this.cart = true;
    }
  }

}
