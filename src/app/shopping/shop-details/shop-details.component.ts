import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent {

  ProductList: any[] = [
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
      rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt'],
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

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 20,
    responsive: {
      0: { items: 1 },
      280: { items: 2 },
      560: { items: 3 },
      900: { items: 4 },  
    },
  };
}
