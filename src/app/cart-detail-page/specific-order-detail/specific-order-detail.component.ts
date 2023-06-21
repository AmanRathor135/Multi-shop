import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-specific-order-detail',
  templateUrl: './specific-order-detail.component.html',
  styleUrls: ['./specific-order-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecificOrderDetailComponent implements OnInit, OnDestroy {

  @ViewChild('content') content: any;
  orderId: any;
  subscription: Subscription[] = [];
  currency: any;
  currencyPrice: any;
  orderDetail: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getOrderIdFromActiveRoute();
    this.getSingleOrderDetail();
    this.getCurrencyName();
    this.getBreadcrumb();
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
  }

  // Taking Order Id from Activated Route
  getOrderIdFromActiveRoute() {
    let sub1 = this.activeRoute.paramMap.subscribe((res: any) => {
      this.orderId = res.params.id;
    });
    this.subscription.push(sub1);
  }

  // Getting Single order Detail using Order Id as Params in Product Service GET method
  getSingleOrderDetail() {
    let sub2 = this.service.getSingleOrder(this.orderId).subscribe({
      next: (res: any) => {
        this.orderDetail = res.data;
        console.log('orderDetail', this.orderDetail);
      },
      error: (err: any) => { console.log('single order detail Error', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
    this.subscription.push(sub2);
  }

  // get Selected Currency Name using Behavior Subject of Product Service
  getCurrencyName() {
    let sub3 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub3);
  }

  downloadAsPDF(type: any) {
    if (type == 'pdf') {
      html2canvas(this.content.nativeElement, {scale:2, useCORS:true}).then((canvas: any) => {
        let imgWidth = 208;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;
        let margin = 10;
        let contentImage = new Image();
        contentImage.src = canvas.toDataURL('image/png');
        contentImage.onload = function () {
          let pdf = new jsPDF('p', 'mm', 'a4');
          pdf.addImage(contentImage, 'PNG', margin, margin, pdf.internal.pageSize.width - (margin * 2), imgHeight - (margin * 2));
          pdf.save('order-detail.pdf');
        }
      });
    } 
    else if (type == 'print') {
      window.print();
    }
    // To Do ....
    else if (type == 'csv'){

    }
  };

  // get Price of Selected Currency from Local Storage
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  }

  // Set the Breadcrumb using Product Service
  getBreadcrumb() {
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Shop', url: 'Shop' },
      { pageTitle: 'Order Detail', url: 'cart-detail/order-detail' },
    ]);
  }

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
