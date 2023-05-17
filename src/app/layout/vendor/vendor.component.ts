import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent {
  vendorList: any[] = [
    'assets/img/vendor-1.jpg',
    'assets/img/vendor-2.jpg',
    'assets/img/vendor-3.jpg',
    'assets/img/vendor-4.jpg',
    'assets/img/vendor-5.jpg',
    'assets/img/vendor-6.jpg',
    'assets/img/vendor-7.jpg',
    'assets/img/vendor-8.jpg',
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 20,
    responsive: {
      0: {
        items: 1,
      },
      170: {
        items: 2,
      },
      340: {
        items: 3,
      },
      510: {
        items: 4,
      },
      680: {
        items: 5,
      },
      950: {
        items: 6,
      },
      
    },

  };
}
