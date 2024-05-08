import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { CategoryService } from '../../_service/category.service';
import Swal from 'sweetalert2';
import { Category } from '../../_model/category';
import { ProductComponent } from '../product/product.component';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_dto/swal-message';
import { Location } from '@angular/common';
import { ProductImage } from '../../_model/product-image';
import { Cart } from '../../../invoice/_model/cart';
import { CartService } from '../../../invoice/_service/cart.service';
import { ProductImageService } from '../../_service/product-image.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Output() productAdded = new EventEmitter<boolean>();


  gtin = '0';
  product: any = {};
  category: any = {};
  categories: Category[] = [];
  submitted = false;
  swal: SwalMessages = new SwalMessages();
  id = 0;
  productImages: ProductImage[] = []; // product images
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  productQuantity: number = 1;

  constructor(
    private rutaActiva: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    private cartService: CartService,
    private imageService: ProductImageService,
    private ngxService: NgxPhotoEditorService
  ) { }

  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  })

  ngOnInit(): void {
    this.gtin = this.rutaActiva.snapshot.params['gtin'];
    console.log(this.gtin);
    this.product = this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v.body;
        this.getProductImages(this.product.product_id);
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
    
  }


  getProductImages(product_id: number) {
    this.imageService.getProductImages(product_id).subscribe({
      next: (v) => {
        this.productImages = v.body!;
        console.log(this.productImages)
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  getProduct() {
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
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.submitted = false;
    this.onSubmitUpdate();

  }

  onSubmitUpdate() {
    console.log(this.form.value);
    this.productService.updateProduct(this.form.value, this.id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProduct(); // reload products
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  editarProducto() {
    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        let product = v.body!;

        this.id = product.product_id;

        this.form.reset();
        this.submitted = false;

        this.form.controls['product'].setValue(product.product);
        this.form.controls['gtin'].setValue(product.gtin);
        this.form.controls['gtin'].disable();
        this.form.controls['price'].setValue(product.price);
        this.form.controls['stock'].setValue(product.stock);
        this.form.controls['category_id'].setValue(product.category_id);
        this.form.controls['description'].setValue(product.description);

        $("#modalForm").modal("show");
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  goBack() {
    this.location.back();
  }

  quantityUp() {
    this.productQuantity++;
  }

  quantityDown() {
    if (this.productQuantity > 1) {
      this.productQuantity--;
    }
  }

  addToCart(){
    let cart = {
      gtin: this.gtin,
      quantity: this.productQuantity
    }

    this.cartService.addToCart(cart).subscribe({
      next: (v) => {
        let text = this.productQuantity > 1? "Products added to cart" : "Product added to cart";  
        this.swal.successMessage(text);
        this.productAdded.emit(true);
      },
      error: (e) => {
        this.swal.errorMessage(e.error!.message);
      }
    });

  }

  newImage($event: any) {
    this.ngxService.open($event, {
      aspectRatio: 4 / 3,
      autoCropArea: 1
    }).subscribe((data) => {
      console.log(data.base64)
      this.createProductImage(data.base64!);
    })
  }

  createProductImage(image: string) {
    let productImage = new ProductImage();
    productImage.product_id = this.product.product_id;
    productImage.image = image;
    this.imageService.createProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage("Image created"); // show message
        this.getProductImages(this.product.product_id); // reload images
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showImageModal() {
    this.getProductImages(this.product.product_id)
    $("#modalImages").modal("show");
  }
}
