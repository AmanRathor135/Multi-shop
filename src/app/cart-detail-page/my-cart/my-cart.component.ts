import { Component } from '@angular/core';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent {

  value:any = 1;
  selectedIndex:any;
  myCart:any[] = [
    {
      imgSrc:'assets/img/product-1.jpg',
      name:'Product Name',
      price:'150'
    },
    {
      imgSrc:'assets/img/product-2.jpg',
      name:'Product Name',
      price:'150'
    },
    {
      imgSrc:'assets/img/product-3.jpg',
      name:'Product Name',
      price:'150'
    },
    {
      imgSrc:'assets/img/product-4.jpg',
      name:'Product Name',
      price:'150'
    },
    {
      imgSrc:'assets/img/product-5.jpg',
      name:'Product Name',
      price:'150'
    }
  ];
  


  constructor() {
    // this.myCart = [{...this.myCart, 'quantity':this.value}]
    // console.log(this.myCart);
    
  }

  add(val:any, index:any){ 
    this.selectedIndex = index
    this.value = parseInt(val[this.selectedIndex]) + 1

  }
  remove(val:any){
    if(this.value > 1){
      this.value = this.value - 1;
    }
    else if (this.value <= 1){
      this.value = 1
    }
  }

  removeRow(index:any){
    if(this.myCart.length){
      this.myCart.splice(index,1)
    } 
  }
}
