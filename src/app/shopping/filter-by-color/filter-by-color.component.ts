import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-by-color',
  templateUrl: './filter-by-color.component.html',
  styleUrls: ['./filter-by-color.component.scss']
})
export class FilterByColorComponent {

  filterByColor: any = {
    category: 'Filter by Color',
    data: [
      {
        value: 'All color',
        price: '1000',
        for:'color-all'
      },
      {
        value: 'Black',
        price: '150',
        for:'color-1'
      },
      {
        value: 'White',
        price: '295',
        for:'color-2'
      },
      {
        value: 'Red',
        price: '246',
        for:'color-3'
      },
      {
        value: 'Blue',
        price: '145',
        for:'color-4'
      },
      {
        value: 'Green',
        price: '168',
        for:'color-5'
      },
    ],
  };

}
