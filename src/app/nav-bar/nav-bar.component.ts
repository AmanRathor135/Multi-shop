import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit, OnDestroy {
  category: any;
  totalCartProduct: any = 0;
  totalFavoriteProduct: any = 0;
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
    { category: 'Shop', route: 'Shop/shop' },
  ];

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { };
  
  ngOnInit(): void {
    this.filter('Home');
    this.getCategories();
    this.service.totalCartItems.next(true);

    let sub1 = this.service.totalCartItems.subscribe((res: any) => {
      if (res) {
        this.getTotalCartProduct();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);

    let sub2 = this.service.totalFavoriteItems.subscribe((res: any) => {
      this.totalFavoriteProduct = res;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  };

  categories(item: any) {
    let url = `Shop/shop/${item}`;
        this.router.navigate([url], {queryParams: {category:item}}); 
  };

  getCategories() {
    let sub3 = this.service.getFilteredProducts({categoryList:true}).subscribe({
      next: (res: any) => { this.categoryList = res.data.categoryList; },
      error: (err: any) => { console.log('err', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
    this.subscription.push(sub3);
  };

  getTotalCartProduct() {
    if (localStorage.getItem('addCartItem')) {
      let total: any = localStorage.getItem('addCartItem');
      this.totalCartProduct = JSON.parse(total).length;
      this.cdr.markForCheck();
    }
  };

  filter(name: any) {
    this.category = name;
  };

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  };
}
