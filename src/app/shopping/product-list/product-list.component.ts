import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  category:any;
  math= Math;
  totalRate:any;
  icons:any[]= ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search']
  // Lists:any[] = [
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-1.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-2.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt',],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-3.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-4.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-5.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-6.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-7.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'fa fa-star-half-alt', 'far fa-star'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-8.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star'],
  //     reviews: '99',
  //   },
  //   {
  //     ProductName: 'Product Name Goes Here',
  //     price: '123',
  //     src: 'assets/img/product-9.jpg',
  //     icons: ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search'],
  //     rating: ['fa fa-star', 'fa fa-star', 'fa fa-star', 'far fa-star', 'far fa-star'],
  //     reviews: '99',
  //   },
  // ];

  productList:any[] = [];
  constructor(private service:ProductService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((res:any) => {
      this.category = res.params.id;
      if(this.category){
        this.getProducts();
      }
      else{

        this.getAllProducts();
      }  
    })
    this.rating(5);
    
  }

  getProducts(){
    this.service.getSpecificCategory(this.category).subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => { console.log("completed!")}
    })
  }

  getAllProducts(){
    this.service.getAllProducts().subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => { console.log("completed!")}
    })
  }

  rating(value:any){
    this.totalRate = Array(value)
  }
}
