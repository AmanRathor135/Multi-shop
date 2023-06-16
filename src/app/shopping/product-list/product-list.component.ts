import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() filterValue:any;

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

  constructor(private service: ProductService, private activateRoute: ActivatedRoute, private cdr:ChangeDetectorRef,
    private router:Router, private toastr:ToastrService) {
    this.service.totalFavoriteItems.next(this.total);
    this.getParamsFromActiveRoute();
  }

  ngOnInit(): void {
    // this.getAllProducts();
    this.getCurrencyName(); 
    this.rating(5);
  }

  ngOnChanges() {
      this.page = 1;
      this.data = {'filter':this.filterValue.filter, 'page':this.page, 'limit':this.itemsPerPage};
      this.getProductsByFilter();
  };

  // get Selected Currency Name using Behavior Subject of Product Service
  getCurrencyName(){
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) { 
        this.currency = res; 
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);
  };

  // getting values as a Query Params using ActivatedRoute
  getParamsFromActiveRoute(){
    let sub2 = this.activateRoute.queryParamMap.subscribe((res: any) => {
      this.page = 1;
      this.data = {...res.params,'page':this.page,'limit':this.itemsPerPage};
      this.getProductsByFilter();
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  }

  // Route to Products Detail Page
  detailsPage(productId:any){
    this.router.navigate(['/Shop/Shop-details', productId]);
  };

  getProductsByFilter(){
    let data = this.data;    
    let sub3 = this.service.getFilteredProducts(data).subscribe({
      next: (res: any) => {
        if(res.type == 'success') {
          this.productList = res.data.productList;
          this.totalItem = res.totalProduct;
        }
        else {
          this.productList = [];
        }
        // this.productList?.map((product) => (product['isShow'] = false));
      },
      error: (err: any) => { console.log('err', err); },
      complete: () => {this.cdr.markForCheck();},
    });
    this.subscription.push(sub3);
  };

  // get Price of Selected Currency from Local Storage
  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  /**
   * Adding a product in a Wishlist component
   * @param productId is a product's Id
   * if product.isShow true then it is added in favoriteItemList Array and set in Local Storage
   * else remove from favoriteItemList Array and update and set the Local Storage
   */
  doFavorites(productId: any) {
    let sub4 = this.service.addProductInFavorites({"productId":productId}).subscribe({
      next: (res:any) => {
        res.type=='success'? this.toastr.success(res.message):this.toastr.info(res.message); 
        this.service.favoriteItemsCount();
      },
      error: (err:any) => { console.log("Do Favorites Error", err);},
      complete: () => { this.cdr.markForCheck();}
    });
    this.subscription.push(sub4);
  };

  // Adding in Cart using ProductId
  addToCart(productId:any){
    if(localStorage.getItem('token')){
      let sub5 = this.service.InsertInCart({"productId":productId, quantity:1}).subscribe({
        next: (res:any) => {
          if (res.type=='success'){
            this.toastr.success(res.message)
            this.service.cartItemsCount();
          }
        },
        error: (err:any) => { console.log("add to cart error",err); },
        complete: () => { this.cdr.markForCheck(); }
      });
      this.subscription.push(sub5);
    }
    else {
      let result = confirm("You have to LoggedIn First");
      if(result){
        this.router.navigate(['/auth/login']);
      }
    }
  };

  /** 
   * Pagination of product using ngx-pagination
   * @param event for pagination
   */
  pageChangeEvent(event: number) {
    this.page = event;
    this.data.page = this.page
    this.data.limit = this.itemsPerPage;
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


  // get Products in Row or Column using click show function
  show() {
    this.isShow = !this.isShow;
  };

  /**
   * Sort Products using Product Service's POST Method
   * @param value as a key of product
   */
  sorting(value:any) {
    this.page = 1;
    this.data.page = this.page;
    this.data.sort = {field: value,  order: "desc"};
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
