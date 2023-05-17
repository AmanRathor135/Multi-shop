import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  category: any;
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
    {
      category: 'Pages',
      data: [
        {
          type: 'Shopping Cart',
          route: 'cart-detail/my-cart',
        },
        {
          type: 'Checkout',
          route: 'cart-detail/checkout',
        },
      ],
    },
    {
      category: 'Contact',
      route: 'contact',
    },
  ];

  navbarIcon:any[] = [
    {
      icon:'fas fa-heart',
      value:'0'
    },
    {
      icon:'fas fa-shopping-cart',
      value:'0'
    }
  ] 

  constructor(private service:ProductService) {
    this.filter('Home');
  }
  
  ngOnInit(): void {
    this.getCategories()
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
  }

  filter(name: any) {
    this.category = name;
  }
}
