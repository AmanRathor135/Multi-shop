import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  subscription:Subscription[] = [];
  total: number = 0;
  currency: any;
  currencyPrice:any;
  totalItem:any;
  favoriteItemList:any[] = [];
  page: number = 1;
  isShow: boolean = true;
  category: any;
  math = Math;
  productList: any[] = [];
  totalRate: any;

  Dropdown1: any[] = [
    {
      title: 'Sorting',
      category: ['Products', 'rating', 'price'],
    },
  ];

  Dropdown2: any[] = [
    {
      title: 'Showing',
      category: ['10', '20', '30'],
    },
  ];
  filter:any;

  constructor(
    private service: ProductService,
    private activateRoute: ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {
    this.service.totalFavoriteItems.next(this.total);
    // let value:any = localStorage.getItem('filter');
    // this.filter = JSON.parse(value);
    // console.log("filter",this.filter);
  }

  ngOnInit(): void {
    this.getAllProducts();
    // this.getFilterProduct();
    this.service.totalCartItems.next(true);

    let list:any = localStorage.getItem('favoriteItemList');
    list = JSON.parse(list).length;
    this.service.totalFavoriteItems.next(list); 

    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) { 
        this.currency = res; 
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);

    let sub2 = this.activateRoute.paramMap.subscribe((res: any) => {      
      setTimeout(() => { this.category = res.params.id;}, 1);
      if (this.category) {
        this.getProducts();
        this.cdr.markForCheck();
      } 
    });
    this.subscription.push(sub2);

    this.rating(5);
  }

  getFilterProduct(){
    this.service.FilterProducts(this.filter).subscribe({
      next: (res:any) => { 
        this.productList = res.data.products;
        // console.log("res",res.data.products);
      }
    })
  }

  /**
   * get Price of Selected Currency from Local Storage
   */
  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  /**
   * Adding a product in a Wishlist component
   * @param product to add product as a favorite
   * if product.isShow true then it is added in favoriteItemList Array and set in Local Storage
   * else remove from favoriteItemList Array and update and set the Local Storage
   */
  doFavorites(product: any, index:any) {
    product.isShow = !product.isShow;
    this.total = product.isShow ? this.total + 1 : this.total - 1;
    this.service.totalFavoriteItems.next(this.total);    
  
    if(product.isShow === true){
      this.favoriteItemList.push(product);
      localStorage.setItem('favoriteItemList', JSON.stringify(this.favoriteItemList));
    }
    else {
      this.favoriteItemList.splice(index,1);
      localStorage.setItem('favoriteItemList', JSON.stringify(this.favoriteItemList))
    }
    this.cdr.markForCheck();
  };

  /** 
  * Pagination of product using ngx-pagination
  * @param event for pagination
  */
  pageChangeEvent(event: number) {
    this.page = event++;
  };


  /**
   * get Products based on their Category using their product id and passed in url as a Params in Product Service
   * If it give success then we get the products as a Response which we store in productList and go to complete 
   * If it gives error then it will show error
   */
  getProducts() {
    let sub3 = this.service.getSpecificCategory(this.category).subscribe({
      next: (res: any) => { this.productList = res; },
      error: (err: any) => { console.log('err', err); },
      complete: () => {this.cdr.markForCheck();},
    });
    this.subscription.push(sub3);
  };

  /**
   * get All Products using Product Service
   * If it give success then we get the products as a Response which we store in productList and go to complete 
   * If it gives error then it will show error
   */
  getAllProducts() {
    let sub4 = this.service.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res.data.products;
        this.productList.map((product) => (product['isShow'] = false));
      },
      error: (err: any) => { console.log('err', err); },
      complete: () => {this.cdr.markForCheck();},
    });
    this.subscription.push(sub4);
  };

  /**
   * get Products in Row or Column using click show function
   */
  show() {
    this.isShow = !this.isShow;
  };

  /**
   * get Products as per @param value using Product Service's POST Method
   * @param value as a key of product
   * where we get data in ascending order
   */
  productInDesc(value:any) {
    let sort = {
      sortBy:{
        field: value, // fieldName
        order: "asc"  // asc or desc
    }}

    let sub5 = this.service.getAllProductInDesc(sort).subscribe({
      next: (res: any) => { this.productList = res.data.products; },
      error: (err: any) => { console.log('err', err); },
      complete: () => {this.cdr.markForCheck();},
    });
    this.subscription.push(sub5);
  };

  /**
   * for getting star value using product.rating.rate out of @param value
   * @param value is 5 given in ngOnInit 
   */
  rating(value: any) {
    this.totalRate = Array(value);
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
