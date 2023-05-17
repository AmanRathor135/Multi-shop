import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrls: ['./filter-by-price.component.scss']
})
export class FilterByPriceComponent {

  filterByPrice: any = {
    category: 'Filter by Price',
    data: [
      {
        value: 'All Price',
        price: '1000',
        for:'price-all'
      },
      {
        value: '$0 - $100',
        price: '150',
        for:'price-1'
      },
      {
        value: '$100 - $200',
        price: '295',
        for:'price-2'
      },
      {
        value: '$200 - $300',
        price: '246',
        for:'price-3'
      },
      {
        value: '$300 - $400',
        price: '145',
        for:'price-4'
      },
      {
        value: '$400 - $500',
        price: '168',
        for:'price-5'
      },
    ],
  };

}
