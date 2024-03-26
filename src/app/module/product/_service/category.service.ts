import { Injectable } from '@angular/core';
import { Category } from '../_model/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  getCategories(): Category[] {
    let categories: Category[] = [
      new Category(1, "Shonen", "SHN", "Active"),
      new Category(2, "Shojo", "SHJ", "Inactive"),
      new Category(3, "Josei", "JSI", "Active"),
      new Category(4, "Isekai", "ISK", "Active"),
      new Category(5, "Comics", "CMCS", "Inactive"),
      new Category(6, "Kodomo", "KDM", "Active"),
      new Category(7, "Seinen", "SNN", "Active"),
      new Category(8, "Mecha", "MCH", "Inactive"),
      new Category(9, "Mahou Shojo", "MHS", "Active"),
      new Category(10, "Spokon", "SPK", "Inactive"),
    ];

    return categories;
  }
}
