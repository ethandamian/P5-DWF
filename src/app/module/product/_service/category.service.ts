import { Injectable } from '@angular/core';
import { Category } from '../_model/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  getCategories(): Category[] {
    let categories: Category[] = [
      new Category(1, "Technology", "TECH", "Active"),
      new Category(2, "Literature", "LIT", "Inactive"),
      new Category(3, "Food & Beverage", "FOOD", "Active"),
      new Category(4, "Fashion", "FASH", "Active"),
      new Category(5, "Health & Wellness", "HEALTH", "Inactive"),
    ];

    return categories;
  }
}
