import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrls: ['./filter-by-price.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FilterByPriceComponent implements OnInit {

  isChecked:boolean = false;
  filterData:any;
  filter:any = {
    'filter': {
      'price' : [
        
      ],
      'color' : [],
      'size' : []
    }
  }

  constructor(private cdr:ChangeDetectorRef, private service:ProductService){}

  ngOnInit(): void {
    this.getFilterOptions();
  }

  getFilterOptions(){
    this.service.filterOptions().subscribe({
      next: (res:any) => { this.filterData = res.data;},
      error: (err:any) => {console.log("Filter Error",err);},
      complete: () => {this.cdr.markForCheck();}
    })
  }

  filterDataValue(category:any,item:any){
    this.isChecked = true;
    if(category.category === "Filter by Price")  {
      this.filter?.filter?.price.push({'min':parseInt(item.value1), 'max':parseInt(item.value2)});
    }
    else if(category.category === "Filter by Color") {
      this.filter?.filter?.color.push(item.value1)
    }
    else if(category.category === "Filter by Size") {
      this.filter?.filter?.size.push(item.value1)
    }

    let value = JSON.stringify(this.filter);
    // localStorage.setItem('filter',value || '{}')
    console.log("filter",value);
    // this.router.navigate(['/Shop/shop',value]);
    // console.log("category",category);
    // console.log("item",typeof parseInt(item.value1));
  }
}
