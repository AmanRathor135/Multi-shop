import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categoryList: any = {
    title: 'Categories',
    category: 'Category Name',
    totalProducts: '100 Products',
    imgSrc: [
      'assets/img/cat-1.jpg',
      'assets/img/cat-2.jpg',
      'assets/img/cat-3.jpg',
      'assets/img/cat-4.jpg',
      'assets/img/cat-4.jpg',
      'assets/img/cat-3.jpg',
      'assets/img/cat-2.jpg',
      'assets/img/cat-1.jpg',
      'assets/img/cat-2.jpg',
      'assets/img/cat-1.jpg',
      'assets/img/cat-4.jpg',
      'assets/img/cat-3.jpg',
    ],
  };
}
