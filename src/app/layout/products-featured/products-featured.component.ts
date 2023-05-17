import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.scss'],
})
export class ProductsFeaturedComponent implements OnInit {
  title: string = 'Featured Products';
  productList:any[] = [];
  math= Math;
  totalRate:any;
  icons:any[]= ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search']
  featuredProductList: any[] = [
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

  constructor(private service:ProductService) {}

  ngOnInit(): void {
    this.getProducts()
    this.rating(5)
  }

  getProducts(){
    this.service.fetchLimitedProducts().subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => { }
    })
  }
  rating(value:any){
    this.totalRate = Array(value)
  }
}
