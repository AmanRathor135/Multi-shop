import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  
  singleProduct: any;
  selectedItem: any;
  subscription:Subscription[] = [];
  id: any;
  math = Math;
  currency: any;
  currencyPrice: any;
  totalRate: any;
  value: any = 1;

  sizes: any = {
    category: 'Sizes',
    data: [
      { label: 'size-1', name: 'XS' },
      { label: 'size-2', name: 'S' },
      { label: 'size-3', name: 'M' },
      { label: 'size-4', name: 'L' },
      { label: 'size-5', name: 'XL' },
    ],
  };

  colors: any = {
    category: 'Colors',
    data: [
      { label: 'color-1', name: 'Black' },
      { label: 'color-2', name: 'White' },
      { label: 'color-3', name: 'Red' },
      { label: 'color-4', name: 'Blue' },
      { label: 'color-5', name: 'Green' },
    ],
  };

  socialLinks: any[] = ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in', 'fab fa-pinterest'];

  constructor(
    private route: ActivatedRoute,
    private service: ProductService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrencyName();
    this.getSingleProductById();
    this.rating(5);
  }
  
  getCurrencyName(){
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);
    this.service.currency.next(this.currency);
  };

  getSingleProductById(){
    let sub2 = this.route.paramMap.subscribe((res: any) => {
      this.id = res.params.id;
      this.getSingleProductData();
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  };

  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  getSingleProductData() {
    let sub3 = this.service.getSingleProduct(this.id).subscribe({
      next: (res: any) => { this.singleProduct = res.data?.productList; },
      error: (err: any) => { console.log('err', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
    this.subscription.push(sub3);
  };

  addToCart(item: any) {
    if(localStorage.getItem('token')){
      let sub4 = this.service.InsertInCart({"productId":item._id, quantity:this.value}).subscribe({
        next: (res:any) => {
          if (res.type=='success'){
            this.toastr.success(res.message)
            this.service.cartItemsCount();
          }
        },
        error: (err:any) => { console.log("add to cart error",err); },
        complete: () => { this.cdr.markForCheck(); }
      });
      this.subscription.push(sub4);
    }
    else{
    let result = confirm("You have to LoggedIn First");
      if(result){
        this.router.navigate(['/auth/login']);
      }
    }
  };

  rating(value: any) {
    this.totalRate = Array(value);
  };

  add() {
    this.value = this.value + 1;
  };

  remove() {
    if (this.value > 1) { this.value = this.value - 1; } 
    else if (this.value <= 1) { this.value = 1; }
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  };
}
