import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchText:string = '';
  total:any = 0;
  category:any;
  math= Math;
  totalRate:any;
  icons:any[]= ['fa fa-shopping-cart', 'far fa-heart', 'fa fa-sync-alt', 'fa fa-search']

  Dropdown1:any[] = [
    {
      title:'Sorting',
      category:['Ascending', 'Descending']
    },
    
  ];

  Dropdown2:any[] = [
    {
      title:'Showing',
      category:['10', '20', '30']
    },
  ]

  productList:any[] = [];
  constructor(private service:ProductService, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.service.totalCartItems.next(true);

    this.route.paramMap.subscribe((res:any) => {
      this.category = res.params.id;
      if(this.category){
        this.getProducts();
      }
      else{
        this.getAllProducts();
      }  
    })
    this.rating(5);
    
  }
  doFavorites(){
    this.total = this.total + 1;
    localStorage.setItem('total',this.total)
    this.service.totalFavoriteItems.next(this.total)
  }

  getProducts(){
    this.service.getSpecificCategory(this.category).subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {}
    })
  }

  getAllProducts(){
    this.service.getAllProducts().subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {}
    })
  };

  productInDesc(){  
    this.service.getAllProductInDesc().subscribe({
      next: (res:any) => {
        this.productList = res;
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {}
    })
  }

  rating(value:any){
    this.totalRate = Array(value)
  }
}
