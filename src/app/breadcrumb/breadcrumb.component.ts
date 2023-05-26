import { Component, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnDestroy {

  Breadcrumb$:any[] =[];
  subscription:Subscription[] = [];
  
  constructor(private service:ProductService) {  
    let sub1 = service.Breadcrumb.subscribe((res) => {
      this.Breadcrumb$ = res;  
    });
    this.subscription.push(sub1); 
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
