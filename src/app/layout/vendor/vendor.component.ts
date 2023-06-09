import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit, OnDestroy {

  vendorList: any[] = [];
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
      0: { items: 1, },
      170: { items: 2, },
      340: { items: 3, },
      510: { items: 4, },
      680: { items: 5, },
      950: { items: 6, }, 
    },
  };

  constructor(private service:ProductService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getVendorSliderList();
  }

  // Getting Company's Images for slider using Product Service GET method
  getVendorSliderList(){
    let sub1 = this.service.vendorSliderList().subscribe({
      next: (res:any) => { this.vendorList = res.data.images; },
      error: (err:any) => { console.log("Vendor Error",err); },
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
