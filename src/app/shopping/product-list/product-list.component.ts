import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() filterProductList:any;

  subscription:Subscription[] = [];
  total: number = 0;
  currency: any;
  currencyPrice:any;
  category: any;
  totalRate: any;
  math = Math;
  data:any = {};
  itemsPerPage:number = 6;
  totalItem:any = 20;
  page: number = 1;
  isShow: boolean = true;
  productList: any[] = [];
  favoriteItemList:any[] = [];

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
    private cdr:ChangeDetectorRef,
    private router:Router
  ) {
    this.service.totalFavoriteItems.next(this.total);
  }

  ngOnInit(): void {
    this.getAllProducts();
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

    let sub2 = this.activateRoute.queryParamMap.subscribe((res: any) => {      
      this.data = res.params;
      this.getProductsByFilter();
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);

    this.rating(5);
  }

  ngOnChanges() {
      this.page = 1;
      this.productList = this.filterProductList; 
      this.totalItem = this.filterProductList?.length; 
  };

  detailsPage(productId:any){
    // console.log("productId", productId);
    if(localStorage.getItem('token')){
      this.router.navigate(['/Shop/Shop-details', productId])
    }
    else{
      let result = confirm("Please login first");
      if(result){
        this.router.navigate(['auth/login']);
      }
    }
  }

  getProductsByFilter(){
    let data = this.data;    
    let sub5 = this.service.getFilteredProducts(data).subscribe({
      next: (res: any) => {
        this.productList = res.data?.productList;
        // this.totalItem = this.productList.length;
        this.productList?.map((product) => (product['isShow'] = false));
      },
      error: (err: any) => { console.log('err', err); },
      complete: () => {this.cdr.markForCheck();},
    });
    this.subscription.push(sub5);
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
    this.totalItem = 20;
    this.page = event;
    this.data = {page:this.page,limit:this.itemsPerPage};
    this.getProductsByFilter();
  };

  /**
   * get All Products using Product Service
   * If it give success then we get the products as a Response which we store in productList and go to complete 
   * If it gives error then it will show error
   */
  getAllProducts() {
    this.page = 1;
    this.data = {};
    this.getProductsByFilter();
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
  sorting(value:any) {
    this.page = 1;
    this.data = { sort:{ field: value,  order: "desc" } };
    this.getProductsByFilter();
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
