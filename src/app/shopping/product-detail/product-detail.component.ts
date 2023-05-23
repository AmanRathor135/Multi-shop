import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  singleProduct:any;
  selectedItem: any;
  id:any;
  math= Math;
  currency:any;
  totalRate:any;
  value:any = 1;

  sizes: any ={ 
    category:'Sizes',
    data: [
    { label: 'size-1', name: 'XS'},
    { label: 'size-2', name: 'S' },
    { label: 'size-3', name: 'M' },
    { label: 'size-4', name: 'L' },
    { label: 'size-5', name: 'XL' },
  ]
}

  colors:any = {
    category:'Colors',
    data: [
    { label: 'color-1', name: 'Black' },
    { label: 'color-2', name: 'White' },
    { label: 'color-3', name: 'Red' },
    { label: 'color-4', name: 'Blue' },
    { label: 'color-5', name: 'Green' },
  ]};

  socialLinks:any[] = ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in', 'fab fa-pinterest']
  
  constructor(private route:ActivatedRoute, private service:ProductService, private router:Router){}

  ngOnInit(): void {
    this.service.currency.next(this.currency);
    this.service.currency.subscribe((res:any) => {
      this.currency = res;      
    });

    this.service.totalCartItems.next(true);
    
    this.route.paramMap.subscribe((res:any) => {
      this.id = res.params.id;
      this.getSingleProduct();
    });

    this.rating(5)
  }

  getSingleProduct(){
    this.service.getSingleProduct(this.id).subscribe({
      next: (res:any) => {
        this.singleProduct = res;        
      },
      error: (err:any) => {
        console.log('err', err)
      },
      complete: () => {}
    })
  };

  addToCart(item:any){
    this.selectedItem = item;
    this.selectedItem['quantity'] = this.value;
    let cartItems:any[] = [];

    const getCartItem = JSON.parse(localStorage.getItem("addCartItem") || "{}");
    if (getCartItem && getCartItem.length ) {
      cartItems = getCartItem;
      cartItems.push(this.selectedItem);
    } else {
      cartItems.push(this.selectedItem);
    }
    
    cartItems = [ ...new Map(cartItems.map((item:any) => [item['id'], item])).values()]
    localStorage.setItem("addCartItem", JSON.stringify(cartItems));
    this.service.totalCartItems.next(true);    
  }

  rating(value:any){
    this.totalRate = Array(value);
  };

  add(){
    this.value = this.value + 1;
  };

  remove(){
    if(this.value > 1){
      this.value = this.value - 1;
    }
    else if (this.value <= 1){
      this.value = 1
    }
  };
}
