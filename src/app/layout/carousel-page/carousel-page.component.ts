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
  // carousel:any = [
  //   {
  //     title:'Men Fashion',
  //     imgSrc:'assets/img/carousel-1.jpg',
  //     desc:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
  //     btnName:'Shop Now'
  //   },
  //   {
  //     title:'Women Fashion',
  //     imgSrc:'assets/img/carousel-2.jpg',
  //     desc:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
  //     btnName:'Shop Now'
  //   },
  //   {
  //     title:'Kids Fashion',
  //     imgSrc:'assets/img/carousel-3.jpg',
  //     desc:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
  //     btnName:'Shop Now'
  //   },
  // ];

  // offerZone:any = {
  //   savings:'Save 20%',
  //   type:'Special Offer',
  //   btnName:'Shop Now',
  //   imgSrc:['assets/img/offer-1.jpg', 'assets/img/offer-2.jpg']
  // }

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
  }

  getBannerPage(){
   let sub1 = this.service.getBannerPoster().subscribe({
      next: (res:any) => {
        this.carousels = res.data.carousels;
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
