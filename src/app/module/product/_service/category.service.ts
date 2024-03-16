import { Injectable } from '@angular/core';
import { Category } from '../_model/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  getCategories(): Category[] {
    let categories: Category[] = [
      new Category(1, "Shonen", "SHN", 1),
      new Category(2, "Shojo", "SHJ", 0),
      new Category(3, "Josei", "JSI", 1),
      new Category(4, "Isekai", "ISK", 1),
      new Category(5, "Comics", "CMCS", 0),
    ];

    return categories;
  }
}
