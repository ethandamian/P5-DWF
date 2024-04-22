import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import Swal from 'sweetalert2';
import { Category } from '../../_model/category';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

    gtin = '0';
    product: any = {};
    category: any = {};
    editar = false;
    categories: Category[] = [];
    
    constructor(private rutaActiva: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) { }
  
    ngOnInit(): void {
      this.gtin = this.rutaActiva.snapshot.params['gtin'];
      console.log(this.gtin);
      this.product = this.productService.getProduct(this.gtin).subscribe({
        next: (v) => {
          this.product = v.body;
          this.category = this.categoryService.getCategory(this.product.category_id).subscribe({
            next: (v) => {
              this.category = v.body?.category;
            },
            error: (e) => {
              console.log(e);
            }
          })
        }
      })
      
      this.categoryService.getCategories().subscribe({
        next: (response) => {
          this.categories = response.body!;
          console.log(this.categories);
        },
        error: (e) => {
          Swal.fire({
            title: 'Error connecting to the server',
            text: e.error!.message,
            icon: 'error',
            showConfirmButton: true,
            background: '#4d425f',
            color: 'white'
          });
        }
  
      })
    }

    editarProducto() {
      this.editar = true;
      console.log(this.editar);
    }
}
