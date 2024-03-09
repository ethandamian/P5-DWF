import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.categories = this.getCategories();
  }

  getCategories() {
    return this.categoryService.getCategories();

  }

}
