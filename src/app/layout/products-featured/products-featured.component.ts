import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFeaturedComponent implements OnInit {
  searchText:string = '';
  productList:any[] = [];
  currency:any;
  math= Math;
  totalRate:any;
  icons:any[]= ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search']  //'far fa-heart',
 
  constructor(private service:ProductService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getProducts()
    this.rating(5)
  }

  getProducts(){
    this.service.currency.subscribe((res:any) => {
      if(res){ 
        this.currency = res; 
        this.cdr.markForCheck();
      }
    });

    this.service.fetchLimitedProducts().subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {this.cdr.markForCheck();}
    })
  };
  
  rating(value:any){
    this.totalRate = Array(value);
  };
}
