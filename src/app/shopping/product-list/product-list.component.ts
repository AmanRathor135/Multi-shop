import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  total: number = 0;
  currency: any;
  totalItem: number = 0;
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
      category: ['Ascending', 'Descending'],
    },
  ];

  Dropdown2: any[] = [
    {
      title: 'Showing',
      category: ['10', '20', '30'],
    },
  ];

  constructor(
    private service: ProductService,
    private activateRoute: ActivatedRoute,
    private cdr:ChangeDetectorRef
  ) {
    this.service.totalFavoriteItems.next(this.total);
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.service.totalCartItems.next(true);

    this.service.currency.subscribe((res: any) => {
      if (res) { 
        this.currency = res; 
        this.cdr.markForCheck();
      }
    });

    this.activateRoute.paramMap.subscribe((res: any) => {
      setTimeout(() => { this.category = res.params.id; }, 1);
      if (this.category) {
        this.getProducts();
        this.cdr.markForCheck();
      } 
    });

    this.rating(5);
  }

  doFavorites(product: any, index:any) {
    product.isShow = !product.isShow;
    this.total = product.isShow ? this.total + 1 : this.total - 1;
    this.service.totalFavoriteItems.next(this.total);    

    // if(product.isShow === true){
    //   this.favoriteItemList.push(product);
    //   localStorage.setItem('favoriteItemList', JSON.stringify(this.favoriteItemList))
    // }
    // else{
    //   this.favoriteItemList.splice(index);
    //   localStorage.setItem('favoriteItemList', JSON.stringify(this.favoriteItemList))
    // }
    this.cdr.markForCheck();
  }

  pageChangeEvent(event: number) {
    this.page = event++;
  }

  getProducts() {
    this.service.getSpecificCategory(this.category).subscribe({
      next: (res: any) => {
        this.productList = res;
        console.log('this.productList', this.productList);
      },
      error: (err: any) => {
        console.log('err', err);
      },
      complete: () => {this.cdr.markForCheck();},
    });
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList = res;
        this.productList.map((product) => (product['isShow'] = false));
      },
      error: (err: any) => {
        console.log('err', err);
      },
      complete: () => {this.cdr.markForCheck();},
    });
  }

  show() {
    this.isShow = !this.isShow;
  }

  productInDesc() {
    this.service.getAllProductInDesc().subscribe({
      next: (res: any) => {
        this.productList = res;
      },
      error: (err: any) => {
        console.log('err', err);
      },
      complete: () => {this.cdr.markForCheck();},
    });
  }

  rating(value: any) {
    this.totalRate = Array(value);
  }
}
