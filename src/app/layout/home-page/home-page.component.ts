import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  title1 :string = 'Featured Products'
  title2 :string = 'Recent Products'
  favItemLength:any;

  constructor(private service:ProductService){

    let list:any = localStorage.getItem('favoriteItemList');
    this.favItemLength = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.favItemLength.length); 

    service.Breadcrumb.next([
      {
        pageTitle: 'Home',
        url: '',
      }
    ]);
  }
}
