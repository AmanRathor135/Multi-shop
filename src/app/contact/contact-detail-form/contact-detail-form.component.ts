import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-contact-detail-form',
  templateUrl: './contact-detail-form.component.html',
  styleUrls: ['./contact-detail-form.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ContactDetailFormComponent implements OnInit, OnDestroy {

  favItemLength:any;
  subscription:Subscription[] = [];
  contactDetails: any[] = [
    {
      icon: 'fa fa-map-marker-alt',
      detail: '123 Street, New York, USA',
    },
    {
      icon: 'fa fa-envelope',
      detail: 'info@example.com',
    },
    {
      icon: 'fa fa-phone-alt',
      detail: '+012 345 67890',
    },
  ];

  contactForm:any = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  
  constructor(private service:ProductService, private toastr:ToastrService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getFavoriteItems();
    /**
     * Set Breadcrumb in Product Service
     */
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Contact', url: 'contact' },
    ]);
  }

  /**
   * get Total Favorite Items from Local Storage
   */
  getFavoriteItems(){
    let list:any = localStorage.getItem('favoriteItemList');
    this.favItemLength = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.favItemLength.length);
  }

  /**
   * sendMessage form using Product Service POST API
   * @param form to check whether contactForm is valid or not
   * To Do List....
   */
  sendMessage(form:NgForm){
    if(form.valid){
      let sub1 = this.service.contactUsForm(this.contactForm).subscribe({
        next: (res:any) => { res.type == 'success'?this.toastr.success(res.message):this.toastr.warning(res.message); },
        error: (err:any) => { console.log("Contact Form Error", err); },
        complete: () => { this.cdr.markForCheck(); }
      });
      this.subscription.push(sub1);
    }
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
