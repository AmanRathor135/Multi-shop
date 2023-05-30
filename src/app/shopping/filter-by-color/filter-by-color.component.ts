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
        items: '1000',
        for:'color-all'
      },
      {
        value: 'Black',
        items: '150',
        for:'color-1'
      },
      {
        value: 'White',
        items: '295',
        for:'color-2'
      },
      {
        value: 'Red',
        items: '246',
        for:'color-3'
      },
      {
        value: 'Blue',
        items: '145',
        for:'color-4'
      },
      {
        value: 'Green',
        items: '168',
        for:'color-5'
      },
    ],
  };

}
