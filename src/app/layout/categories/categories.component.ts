import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnDestroy {
  title: string ='Categories';
  categoryListPage:any[] = [];
  subscription:Subscription[] = [];

  constructor(private service:ProductService, private cdr:ChangeDetectorRef){
    this.getCategories();
  }

  // get list of Categories using Product Service
  getCategories(){
    let sub1 = this.service.getAllCategories().subscribe({
      next: (res:any) => { this.categoryListPage = res.data?.categories; },
      error: (err:any) => { console.log("Categories error", err) },
      complete: () => {this.cdr.markForCheck();}
    });
    this.subscription.push(sub1);
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  };
}
