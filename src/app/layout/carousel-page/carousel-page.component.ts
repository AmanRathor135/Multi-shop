import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-carousel-page',
  templateUrl: './carousel-page.component.html',
  styleUrls: ['./carousel-page.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CarouselPageComponent implements OnInit, OnDestroy {

  carousels:any[] =[];
  offers:any[] = [];
  subscription:Subscription[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 20,
    responsive: {
      0: { items: 1 },
    },
  };

  constructor(private service:ProductService, private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.getBannerPage();
  };

  /**
   * getting Banner Page using Product Service
   * If is success we store the response in carousels and offers Array of Objects and then complete
   * If it gives error then show error in console
   */
  getBannerPage(){
   let sub1 = this.service.getBannerPoster().subscribe({
      next: (res:any) => {
        this.carousels = res.data.carousel;
        this.offers = res.data.special_offer;
      },
      error: (err:any) => { console.log("Carousel error", err) },
        complete: () => {this.cdr.markForCheck();}
    });
    this.subscription.push(sub1)
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  };
}
