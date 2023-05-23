import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {
  category: any;
  totalCartProduct: any = 0;
  totalFavoriteProduct: any = 0;
  categoryList: any[] = [];
  navBarDropdown: any = {
    icon: 'fa fa-bars mr-2',
    title: 'Categories',
    data: [
      {
        category: 'Dresses',
        lists: [`Men's Dresses`, `Women's Dresses`, `Baby's Dresses`],
      },
      {
        category: 'Shirts',
        lists: '',
      },
      {
        category: 'Jeans',
        lists: '',
      },
      {
        category: 'Swimwear',
        lists: '',
      },
      {
        category: 'Sleepwear',
        lists: '',
      },
      {
        category: 'Sportswear',
        lists: '',
      },
      {
        category: 'Jumpsuits',
        lists: '',
      },
      {
        category: 'Blazers',
        lists: '',
      },
      {
        category: 'Jackets',
        lists: '',
      },
      {
        category: 'Shoes',
        lists: '',
      },
    ],
  };

  navbarList: any[] = [
    {
      category: 'Home',
      route: 'Home',
    },
    {
      category: 'Shop',
      route: 'Shop/shop',
    },
    {
      category: 'Contact',
      route: 'contact',
    },
  ];

  constructor(private service: ProductService, private router: Router, private cdr:ChangeDetectorRef) {
    this.filter('Home');
  }

  ngOnInit(): void {
    this.getCategories();
    this.service.totalCartItems.next(true);

    this.service.totalCartItems.subscribe((res: any) => {
      if (res) {
        this.getTotalCartProduct();
        this.cdr.markForCheck();
      }
    });

    this.service.totalFavoriteItems.subscribe((res: any) => {
      this.totalFavoriteProduct = res;
      this.cdr.markForCheck();
    });
  }

  categories(item: any) {
    let url = `Shop/shop/${item}`;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      setTimeout(() => {
        this.router.navigate([url]);
      }, 1);
    });
  }
  getCategories() {
    this.service.getAllCategories().subscribe({
      next: (res: any) => {
        this.categoryList = res;
      },
      error: (err: any) => {
        console.log('err', err);
      },
      complete: () => { this.cdr.markForCheck(); },
    });
  }

  getTotalCartProduct() {
    if (localStorage.getItem('addCartItem')) {
      let total: any = localStorage.getItem('addCartItem');
      this.totalCartProduct = JSON.parse(total).length;
      this.cdr.markForCheck();
    }
  }

  filter(name: any) {
    this.category = name;
  }
}
