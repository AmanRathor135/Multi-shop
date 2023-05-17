import { Component } from '@angular/core';

@Component({
  selector: 'app-products-recent',
  templateUrl: './products-recent.component.html',
  styleUrls: ['./products-recent.component.scss']
})
export class ProductsRecentComponent {
  title: string = 'Recent Products';
  recentProductList: any[] = [
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-1.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star'],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-2.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt',],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-3.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star'],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-4.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star'],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-5.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star'],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-6.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt'],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-7.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star'],
      reviews: '99',
    },
    {
      ProductName: 'Product Name Goes Here',
      price: '123',
      src: 'assets/img/product-8.jpg',
      icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star'],
      reviews: '99',
    },
  ];
}
