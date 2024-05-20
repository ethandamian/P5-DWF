import { Component } from '@angular/core';
import { DtoProductList } from '../module/product/_dto/dto-product-list';
import { ProductService } from '../module/product/_service/product.service';
import { SwalMessages } from '../module/commons/_dto/swal-message';
import { ProductImageService } from '../module/product/_service/product-image.service';
import { ProductImage } from '../module/product/_model/product-image';
import { Router } from '@angular/router';
import { Product } from '../module/product/_model/product';
import { CartService } from '../module/invoice/_service/cart.service';

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
  ) {}

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
    this.productService.getProductsByCategory(3).subscribe({
      next: (v) => {
        this.products = v.body!;
        console.log(this.products);
        // Get the images of the products
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getFirstImageOfProducts(product_id:number) {
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        this.productImages = v.body! || [];
        console.log(this.productImages);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
    console.log(this.productImages[0]);
    return this.productImages[0];
  
  }

  seeMore(){
    this.router.navigate(['/product'])
  }

  showDetail(gtin: string) {
    //redirect to product detail
    // this.router.navigate(['/product/detail'], { queryParams: { gtin: gtin } });
    console.log(gtin);
    this.router.navigate([`product/${gtin}`]);
  }

  addToCart(gtin: string) {
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
