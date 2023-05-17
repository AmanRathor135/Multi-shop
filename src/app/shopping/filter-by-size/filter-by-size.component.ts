import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-by-size',
  templateUrl: './filter-by-size.component.html',
  styleUrls: ['./filter-by-size.component.scss']
})
export class FilterBySizeComponent {



  filterBySize: any = {
    category: 'Filter by size',
    data: [
      {
        value: 'All Size',
        price: '1000',
        for:'size-all'
      },
      {
        value: 'XS',
        price: '150',
        for:'size-1'
      },
      {
        value: 'S',
        price: '295',
        for:'size-2'
      },
      {
        value: 'M',
        price: '246',
        for:'size-3'
      },
      {
        value: 'L',
        price: '145',
        for:'size-4'
      },
      {
        value: 'XL',
        price: '168',
        for:'size-5'
      },
    ],
  };

}
