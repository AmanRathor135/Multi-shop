import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
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
}
