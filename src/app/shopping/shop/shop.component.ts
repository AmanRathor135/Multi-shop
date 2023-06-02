import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShopComponent {

  subscription:Subscription[] = [];
  currency: any;
  currencyPrice:any;
  filterData: any;
  filterProductList:any;
  filterValue: any = {
    'filter': {
      'price': [],
      'color': [],
      'size': [],
    },
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private service: ProductService
  ) {
    service.Breadcrumb.next([
      {
        pageTitle: 'Home',
        url: '',
      },
      {
        pageTitle: 'Shop',
        url: 'Shop/shop',
      },
      {
        pageTitle: 'Shop List',
        url: 'Shop/shop',
      }
    ]);
  }

  ngOnInit(): void {
    this.getFilterOptions();
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) { 
        this.currency = res; 
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);
  }

  /**
   * get Price of Selected Currency from Local Storage
   */
  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  getFilterOptions() {
    this.service.filterOptions().subscribe({
      next: (res: any) => { this.filterData = res.data; },
      error: (err: any) => { console.log('Filter Error', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
  };

  getFilterProduct(){
    let data = this.filterValue;
    this.service.getFilteredProducts(data).subscribe({
      next: (res:any) => { this.filterProductList = res.data.productList; },
      error: (err: any) => { console.log('Filter Product Error', err); },
      complete: () => { this.cdr.markForCheck(); },
    })
  }

  filterDataValue(filterOption: any) {
    let price = this.filterValue.filter.price;
    let color = this.filterValue.filter.color;
    let size = this.filterValue.filter.size;

    if (filterOption.min && filterOption.max) {
      let value = { min: filterOption.min, max: filterOption.max};
      if (price.length) {
        let boolean = price.some( (item: any) => item.min == filterOption.min && item.max == filterOption.max);
        for (let i = 0; i < price.length; i++) {
          if (price[i].min == filterOption.min && price[i].max == filterOption.max) {
            price.splice(i, 1);
          }
        }
        if (!boolean) { price.push(value); }
      } 
      else { price.push(value); }
    } 
    else if (filterOption.color) {
      if (color.includes(filterOption.color)) {
        color.splice(color.indexOf(filterOption.color), 1);
      } 
      else {
        color.push(filterOption.color);
      }
    } 
    else if (filterOption.size) {
      if (size.includes(filterOption.size)) {
        size.splice(size.indexOf(filterOption.size), 1);
      } 
      else {
        size.push(filterOption.size);
      }
    }
    this.getFilterProduct();
  }
}
