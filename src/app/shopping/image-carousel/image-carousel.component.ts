import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ImageCarouselComponent implements OnInit, OnDestroy {

  singleProduct:any;
  id:any;
  subscription:Subscription[] = [];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 20,
    nav:true,
    navText:[`<i class="fa fa-2x fa-angle-left text-dark carousel-control-prev"></i>`,`<i class="fa fa-2x fa-angle-right text-dark carousel-control-next"></i>`],
    responsive: {
      0: { items: 1 },
    },
  };

  constructor(private route:ActivatedRoute, private service:ProductService, private cdr:ChangeDetectorRef){ }

  ngOnInit(): void {
    let sub1 = this.route.paramMap.subscribe((res:any) => {
      this.id = res.params.id ;
      this.getSingleProduct();
      this.cdr.markForCheck();
    });
    this.subscription.push(sub1);
  }

  getSingleProduct(){
    let sub2 = this.service.getSingleProduct(this.id).subscribe({
      next: (res:any) => { this.singleProduct = res.data; },
      error: (err:any) => { console.log('err', err) },
      complete: () => { this.cdr.markForCheck(); }
    });
    this.subscription.push(sub2);
  };

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
