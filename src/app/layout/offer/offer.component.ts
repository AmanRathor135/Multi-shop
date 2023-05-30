import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OfferComponent implements OnInit, OnDestroy {

  offers:any[] = [];
  subscription:Subscription[] = [];
  
  constructor(private service:ProductService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getOfferPage();
  }

  /**
   * getting offerPage using Product Service
   */
  getOfferPage(){
    let sub1 = this.service.getBannerPoster().subscribe({
      next: (res:any) => { this.offers = res.data.special_offer; },
      error: (err:any) => { console.log("Carousel error", err) },
      complete: () => {this.cdr.markForCheck();}
     });
     this.subscription.push(sub1)
   }

   ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    }); 
   }
}
