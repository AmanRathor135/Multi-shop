import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsFeaturedComponent implements OnInit, OnDestroy {
  searchText:string = '';
  productList:any[] = [];
  subscription:Subscription[] = [];
  currency:any;
  currencyPrice:any;
  math= Math;
  totalRate:any;
  icons:any[]= ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search']  //'far fa-heart',
 
  constructor(private service:ProductService, private cdr:ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.getProducts()
    this.rating(5)
  }

  getProducts(){
   let sub1 = this.service.currency.subscribe((res:any) => {
      if(res){ 
        this.currency = res; 
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1)

   let sub2 = this.service.fetchLimitedProducts().subscribe({
      next: (res:any) => {
        this.productList = res.data;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {this.cdr.markForCheck();}
    });
    this.subscription.push(sub2)
  };

  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  }
  
  rating(value:any){
    this.totalRate = Array(value);
  };

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
