import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {


  categories: Category[] = [];


  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]]


  });

  submitted = false;

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) {


  }

  ngOnInit() {
    this.categories = this.getCategories();
  }

  getCategories() {
    return this.categoryService.getCategories();

  }





  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;

    this.addNewCategory();

    this.hideModal();
    this.showNewCategoryAlert();
  }

  addNewCategory() {
    let categoryId = this.categories.length + 1;
    let newCategory = new Category(categoryId, this.form.controls['category'].value!, this.form.controls['acronym'].value!, 1);

    this.categories.push(newCategory);
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
    })

  }

  showModal() {
    $('#categoryFormModal').modal("show");
    this.form.reset();
    this.submitted = false;
  }

  hideModal() {
    $('#categoryFormModal').modal("hide");
  }


}
