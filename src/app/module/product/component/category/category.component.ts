import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  loggedIn: boolean = false;
  isAdmin: boolean = false;


  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]]


  });

  submitted = false;

  swal: SwalMessages = new SwalMessages();

  constructor(
    private categoryService: CategoryService, 
    private formBuilder: FormBuilder,
    private router: Router
  ) {


  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }else{
      this.router.navigate(['/']);
    }

    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.rol == 'ADMIN') {
        this.isAdmin = true;
      } else {
        this.router.navigate(['/']);
        this.isAdmin = false;
      }
      console.log(this.isAdmin);
    }
    this.getCategories();
  }

  disableCategory(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Please confirm the deactivation of the category',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.categoryService.disableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage("The caregory has been disabled"); // show message
            this.categoryService.fetchCategories();
            this.getCategories(); // reload regions
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage("Can't disable category if it has active products"); // show message
          }
        });
      }
    });

  }

  enableCategory(id: number) {
    this.swal.confirmMessage.fire({
      title: 'Please confirm the activation of the category',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.categoryService.enableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.categoryService.fetchCategories();
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
        this.swal.successMessage("The category has been added successfully!"); // show message
        this.categoryService.fetchCategories();
        this.getCategories(); // reload regions
        this.hideModal(); // close modal
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage("Error, the category can't be created, try again"); // show message
      }
    });
  }
  onSubmitUpdate() {
    // add region to region list
    this.categoryService.updateCategory(this.form.value, this.categoryToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage("The categody has been updated succesfully!"); // show message
        this.categoryService.fetchCategories();
        this.getCategories(); // reload regions
        this.hideModal(); // close modalthis.htt
        this.categoryToUpdate = 0; // reset regionToUpdate
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage("Error, the category can't be updated, please try again"); // show message
      }
    });
  }

  updateCategory(category: Category) {
    this.categoryToUpdate = category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['acronym'].setValue(category.acronym);

    this.submitted = false;
    $("#categoryFormModal").modal("show");
    $("#category-form-title").text("Update Category");
    $("#modal-button").text("Update");
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
    $("#category-form-title").text("New Category");
    $("#modal-button").text("Add");
    this.form.reset();
    this.submitted = false;
    this.categoryToUpdate = 0;
  }

  hideModal() {
    $('#categoryFormModal').modal("hide");
  }


}
