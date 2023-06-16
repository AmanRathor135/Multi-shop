import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit, OnDestroy {
  category: any;
  totalCartProduct: any;
  isShowNav:boolean = false;
  totalFavoriteProduct: any;
  categoryList: any[] = [];
  subscription: Subscription[] = [];

  shopDetail: any = {
    first: 'multi',
    last: 'shop',
    icon: 'fa fa-bars mr-2',
    title: 'Categories',
  };

  navbarList: any[] = [
    { category: 'Home', route: 'Home' },
    { category: 'Shop', route: 'Shop' },
    { category: 'Contact', route: 'contact' },
    { category: 'Order History', route: 'cart-detail/order-history' },
  ];

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr:ToastrService
  ) { };
  
  ngOnInit(): void {
    this.filter('Home');
    this.getCategories();
    this.calculateTotalCartItems();
    this.calculateTotalFavoriteItems();
  };

  toggleNav(){
    this.isShowNav = !this.isShowNav
  }

  // Counting the Cart Items which is Selected using Product Service's Behavior Subject
  calculateTotalCartItems(){
    let sub1 = this.service.totalCartItems.subscribe((res: any) => {
      this.totalCartProduct = res;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub1);
  };

  // Counting the Favorite Items which is Selected using Product Service's Behavior Subject
  calculateTotalFavoriteItems(){
    let sub2 = this.service.totalFavoriteItems.subscribe((res: any) => {
      this.totalFavoriteProduct = res;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  };

  // Navigate to Wishlist Page if User is Logged In
  goToWishlist(){
    if(localStorage.getItem('token')){
      this.router.navigate(['wishlist'])
    }
    else{
      this.toastr.info("Login is required");
      this.router.navigate(['/auth/login']);
    }
  };

  // Navigate to Cart Page if User is Logged In
  goToCart(){
    if(localStorage.getItem('token')){
      this.router.navigate(['/cart-detail/my-cart'])
    }
    else{
      this.toastr.info("Login is required");
      this.router.navigate(['/auth/login']);
    }
  };
  
  // get categories using Products Service's API
  getCategories() {
    let sub3 = this.service.getFilteredProducts({"categoryList":true}).subscribe({
      next: (res: any) => { this.categoryList = res.data?.categoryList; },
      error: (err: any) => { console.log('err', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
    this.subscription.push(sub3);
  };

  // Toggle the NavBar on Menu Icon using Click method
  showNavOnToggle(){
    this.isShowNav = !this.isShowNav;
  }
  
  /**
   * Navigate to Shop page using selected Category
   * @param item is a selected Category
   */
  categories(item: any) {
    let url = `Shop`;
    this.router.navigate([url], {queryParams: {category:item}}); 
  };

  // checking which nev-item is active
  filter(name: any) {
    this.category = name;
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  };
}
