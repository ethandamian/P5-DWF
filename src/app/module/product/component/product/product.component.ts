import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_dto/swal-message';
import { ProductService } from '../../_service/product.service';
import { DtoProductList } from '../../_dto/dto-product-list';
import { Category } from '../../_model/category';
import { CategoryService } from '../../_service/category.service';
import { Product } from '../../_model/product';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductImageService } from '../../_service/product-image.service';
import { ProductImage } from '../../_model/product-image';
import { NgxPhotoEditorService } from 'ngx-photo-editor';

declare var $: any; // JQuery

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  products: DtoProductList[] = []; // product list
  productToUpdate: number = 0; // product id to update
  productImages: ProductImage[] = []; // product images
  product_id: number = 0;

  categories: Category[] = []; // category list

  // Product form
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  });

  submitted = false; // Form submitted

  swal: SwalMessages = new SwalMessages(); // swal messages

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private productImageService: ProductImageService,
    private ngxService: NgxPhotoEditorService
  ) { }

  ngOnInit() {
    this.getProducts();
    this.getActiveCategories();
  }

  disableProduct(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Please confirm the product deactivation',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.disableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage("Product successfully desabled"); // show message
            this.getProducts(); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableProduct(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Please confirm the product activation',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.productService.enableProduct(id).subscribe({
          next: (v) => {
            this.swal.successMessage("Product successfully activated"); // show message
            this.getProducts(); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getProduct(gtin: string) {
    this.productService.getProduct(gtin).subscribe({
      next: (v) => {
        return v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (v) => {
        this.products = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  getProductImages(product_id: number) {
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
  }

  onSubmit() {
    // validate form
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    if (this.productToUpdate == 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    this.productService.createProduct(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProducts(); // reload products
        this.hideModalForm(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  onSubmitUpdate() {
    this.productService.updateProduct(this.form.value, this.productToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProducts(); // reload products
        this.hideModalForm(); // close modal
        this.productToUpdate = 0; // reset product to update
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  showDetail(gtin: string) {
    //redirect to product detail
    // this.router.navigate(['/product/detail'], { queryParams: { gtin: gtin } });
    this.router.navigate([`product/${gtin}`]);
  }


  updateProduct(gtin: string) {
    this.productService.getProduct(gtin).subscribe({
      next: (v) => {
        let product = v.body!;

        this.productToUpdate = product.product_id;

        this.form.reset();
        this.submitted = false;

        this.form.controls['product'].setValue(product.product);
        this.form.controls['gtin'].setValue(product.gtin);
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
    productImage.product_id = this.product_id;
    productImage.image = image;
    this.productImageService.createProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage("Image created"); // show message
        this.getProductImages(this.product_id); // reload images
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });

  }

  // modals 

  showModalForm() {
    $("#modalForm").modal("show");
    this.form.reset();
    this.submitted = false;
    this.productToUpdate = 0;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  showImageModal(product_id: number) {
    this.product_id = product_id;
    this.getProductImages(product_id)
    $("#modalImages").modal("show");
  }

  hideImageModal() {
    $("#modalImages").modal("hide");
  }

  // catalogues 

  getActiveCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
}
