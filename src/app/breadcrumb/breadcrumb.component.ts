import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnDestroy {
  Breadcrumb$:any[] =[];
  subscription:Subscription[] = [];
  
  constructor(private service:ProductService,private cdr:ChangeDetectorRef) { 
     this.getBreadcrumb();
  }
  
  /**
   * getting the breadcrumb value using Product Service Behavior Subject
   */
  getBreadcrumb(){
    let sub1 = this.service.Breadcrumb.subscribe((res) => {
      this.Breadcrumb$ = res; 
      this.cdr.markForCheck(); 
    });
    this.subscription.push(sub1); 
  }

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
