import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
})
export class ShopDetailsComponent implements OnInit {
  carouselList: any[] = [];
  math = Math;
  currency: any;
  totalRate: any;
  icons: any[] = [
    'fa fa-shopping-cart',
    'far fa-heart',
    'fa fa-sync-alt',
    'fa fa-search',
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
      0: { items: 1 },
      280: { items: 2 },
      560: { items: 3 },
      900: { items: 4 },
    },
  };

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
      }
    });

    this.getProductsForCarousel();
    this.rating(5);
  }

  getProductsForCarousel() {
    this.service.fetchLimitedProducts().subscribe({
      next: (res: any) => {
        this.carouselList = res;
      },
      error: (err: any) => {
        console.log('err', err);
      },
      complete: () => {},
    });
  }

  rating(value: any) {
    this.totalRate = Array(value);
  }
}
