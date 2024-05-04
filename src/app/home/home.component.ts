import { Component } from '@angular/core';
import { DtoProductList } from '../module/product/_dto/dto-product-list';
import { ProductService } from '../module/product/_service/product.service';
import { SwalMessages } from '../module/commons/_dto/swal-message';
import { ProductImageService } from '../module/product/_service/product-image.service';
import { ProductImage } from '../module/product/_model/product-image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  swal: SwalMessages = new SwalMessages(); // swal messages


  products: DtoProductList[] = [];
  productsImages: ProductImage[][] = [[]]; // products images


  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
  ) {}

  ngOnInit() {
    this.getProducts();
    // Get the images of the products
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
        console.log(this.products);
        // Get the images of the products
        this.getFirstImageOfProducts();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  async getFirstImageOfProducts() {
    let images: ProductImage[] = [];
    
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      await this.getProductImages(product.product_id, images);
      
      if (images.length > 0) {
        console.log(images[0]);
        this.productsImages[i].push(images[0]);
      } else {
        this.productsImages[i] = [];
      }
      images = [];
    }

    console.log(this.productsImages);
  }
  

  async getProductImages(product_id: number, images: ProductImage[]) {
    this.productImageService.getProductImages(product_id).subscribe({
      next: (v) => {
        images = v.body! || [];
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  seeMore(){

  }
}
