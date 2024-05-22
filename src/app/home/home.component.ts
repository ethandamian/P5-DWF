import { Component } from '@angular/core';
import { DtoProductList } from '../module/product/_dto/dto-product-list';
import { ProductService } from '../module/product/_service/product.service';
import { SwalMessages } from '../module/commons/_dto/swal-message';
import { ProductImageService } from '../module/product/_service/product-image.service';
import { ProductImage } from '../module/product/_model/product-image';
import { Router } from '@angular/router';
import { Product } from '../module/product/_model/product';
import { CartService } from '../module/invoice/_service/cart.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  swal: SwalMessages = new SwalMessages(); // swal messages
  isAdmin: boolean = false; // isAdmin
  loggedIn: boolean = false; // is logged in

  products: DtoProductList[] = [];
  productImages: ProductImage[] = []; // product images
  firstImage: ProductImage = new ProductImage();


  constructor(
    private router: Router,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }

    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.rol == 'ADMIN') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      console.log(this.isAdmin);
    }
    this.getProducts();
    // Get the images of the products
  }

  getProducts() {
    this.productService.getActiveProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
        this.products = this.products.slice(0, 8);
        this.getImages();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getImages() {
    let arr: DtoProductList[] = [];
    let observables = this.products.map(product =>
      this.productImageService.getProductImages(product.product_id).pipe(
        map(v => (arr.push({
          ...product,
          image: v.body?.at(0)?.image ?? ""
        })))
      )
    );

    forkJoin(observables).subscribe({
      next: (results) => {
        this.products = arr;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }





  seeMore() {
    this.router.navigate(['/product'])
  }

  showDetail(gtin: string) {
    this.router.navigate([`product/${gtin}`]);
  }

  addToCart(gtin: string) {
    if (!this.loggedIn) {
      this.swal.warningMessage("You must be logged in to add products to the cart");
    } else {

      let cart = {
        gtin: gtin,
        quantity: 1
      }

      this.cartService.addToCart(cart).subscribe({
        next: (v) => {
          this.swal.successMessage("Product added to cart");
          this.cartService.getCount();
        },
        error: (e) => {
          this.swal.errorMessage(e.error!.message);
        }
      });
    }


  }
}
