import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  category: any;
  totalCartProduct:any = 0;
  totalFavoriteProduct:any = 0;
  categoryList:any[] = []
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
    // {
    //   category: 'Shop Detail',
    //   route: 'Shop/Shop-details',
    // },
    // {
    //   category: 'Pages',
    //   data: [
    //     {
    //       type: 'Shopping Cart',
    //       route: 'cart-detail/my-cart',
    //     },
    //     {
    //       type: 'Checkout',
    //       route: 'cart-detail/checkout',
    //     },
    //   ],
    // },
    {
      category: 'Contact',
      route: 'contact',
    },
  ];


  constructor(private service:ProductService) {
    this.filter('Home');
  }
  
  ngOnInit(): void {
    this.getCategories();

    this.service.totalCartItems.subscribe((res:any) => {
      if(res){
        this.getTotalCartProduct();
      }
    });

    this.service.totalFavoriteItems.subscribe((res:any) => { 
        this.getTotalFavoriteProduct();
    });
  }

  getCategories(){
    this.service.getAllCategories().subscribe({
      next: (res:any) => {
        this.categoryList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => { console.log("completed!")}
    })
  };

  getTotalCartProduct(){
    if(localStorage.getItem('addCartItem')){
      let total:any = localStorage.getItem('addCartItem');
      this.totalCartProduct = JSON.parse(total).length;
    }
  };

  getTotalFavoriteProduct(){
    if(localStorage.getItem('total')){
      this.totalFavoriteProduct = localStorage.getItem('total')
    }
  };

  filter(name: any) {
    this.category = name;
  }
}
