import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  wishlist:any[] = [];
  constructor(){
    let list:any = localStorage.getItem('favoriteItemList');
    this.wishlist = JSON.parse(list)
    console.log("wishlist",this.wishlist);
    
  }
}
