import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {

  offers:any[] = [];
  subscription:Subscription[] = [];
  // offerZone:any = {
  //   savings:'Save 20%',
  //   type:'Special Offer',
  //   btnName:'Shop Now',
  //   imgSrc:['assets/img/offer-1.jpg', 'assets/img/offer-2.jpg']
  // }

  constructor(private service:ProductService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getOfferPage();
  }

  getOfferPage(){
    let sub1 = this.service.getBannerPoster().subscribe({
       next: (res:any) => {
         this.offers = res.data.offers;
       },
       error: (err:any) => {
         console.log("Carousel error", err)
       },
         complete: () => {this.cdr.markForCheck();}
     });
     this.subscription.push(sub1)
   }

   ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    }); 
   }
}
