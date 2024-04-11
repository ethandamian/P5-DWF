import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SwalMessages } from '../../../commons/_dto/swal-message';

declare var $: any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {


  categories: Category[] = [];

  categoryToUpdate: number = 0;


  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]]


  });

  submitted = false;

  swal: SwalMessages = new SwalMessages();

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) {


  }

  ngOnInit() {
    this.getCategories();
  }

  disableCategory(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación de la categoría',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.categoryService.disableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCategories(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });

  }

  enableCategory(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación de la category',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.categoryService.enableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCategories(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.body!;
      },
      error: (e) => {
        Swal.fire({
          title: 'Error creating category',
          text: e.error!.message,
          icon: 'error',
          showConfirmButton: true,
          background: '#4d425f',
          color: 'white'
        });
      }

    })

  }





  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    if (this.categoryToUpdate == 0) {
      this.onSubmitCreate();
    } else {
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getCategories(); // reload regions
        this.hideModal(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }
  onSubmitUpdate() {
    // add region to region list
    this.categoryService.updateCategory(this.form.value, this.categoryToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getCategories(); // reload regions
        this.hideModal(); // close modal
        this.categoryToUpdate = 0; // reset regionToUpdate
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateCategory(category: Category) {
    this.categoryToUpdate = category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['acronym'].setValue(category.acronym);

    this.submitted = false;
    $("#modalForm").modal("show");
  }

  showNewCategoryAlert() {
    Swal.fire({
      position: 'top-end',
      title: 'Success!',
      text: 'New category has been added successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
      showConfirmButton: false,
      timer: 2200,
      toast: true,
      background: '#4d425f',
      color: 'white'
    });

  }

  showModal() {
    $('#categoryFormModal').modal("show");
    this.form.reset();
    this.submitted = false;
    this.categoryToUpdate = 0;
  }

  hideModal() {
    $('#categoryFormModal').modal("hide");
  }


}
