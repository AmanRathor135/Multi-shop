import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.scss'],
})
export class ProductsFeaturedComponent implements OnInit {
  searchText:string = '';
  productList:any[] = [];
  math= Math;
  totalRate:any;
  icons:any[]= ['fa fa-shopping-cart', 'fa fa-sync-alt', 'fa fa-search']  //'far fa-heart',
 
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
  };
  
  rating(value:any){
    this.totalRate = Array(value)
  };
}
