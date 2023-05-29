import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShopComponent {

  Dropdown:any[] = [
    {
      title:'Sorting',
      category:['Latest', 'Popularity', 'Best Rating']
    },
    {
      title:'Showing',
      category:['10', '20', '30']
    },
  ];
  constructor(private service:ProductService){
    service.Breadcrumb.next([
      {
        pageTitle: 'Home',
        url: '',
      },
      {
        pageTitle: 'Shop',
        url: 'Shop/shop',
      },
      {
        pageTitle: 'Shop List',
        url: 'Shop/shop',
      }
    ]);
  }

  productInDesc(){
    this.service.getAllProductInDesc()
  };
}
