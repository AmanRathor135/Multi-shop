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
  isShow:any = true;
  selectedIndex:any;
  category:any;
  math= Math;
  totalRate:any;

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
  constructor(private service:ProductService, private route:ActivatedRoute){
    this.service.totalFavoriteItems.next(this.total);
  }

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

  doFavorites(product:any){
    product.isShow =  !product.isShow;       
    this.total=product.isShow?this.total + 1:this.total - 1;
    this.service.totalFavoriteItems.next(this.total);

    // if(product.isShow){
    // this.total = this.total + 1;
    // }else{
    //   this.total = this.total - 1;
    // }
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
        this.productList.map((product)=>product['isShow']=false);        
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {}
    })
  };
  show(){
    this.isShow = !this.isShow
  }

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
