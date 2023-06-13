import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  submitted:boolean = false;
  subscription:Subscription[] = [];
  contactDetails: any[] = [
    { icon: 'fa fa-map-marker-alt', detail: '123 Street, New York, USA' },
    { icon: 'fa fa-envelope', detail: 'info@example.com' },
    { icon: 'fa fa-phone-alt', detail: '+012 345 67890' },
  ];

  contactFormData:FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    subject:new FormControl('',[Validators.required]),
    message: new FormControl('',[Validators.required])
  })

  
  constructor(private service:ProductService, private toastr:ToastrService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.isLoggedIn.next(true);
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
    this.getBreadcrumb();
  };


  // Using form in HTML as a contactFormData.controls
  get form(): { [key: string]: AbstractControl } {
    return this.contactFormData.controls;
  };

  /**
   * sendMessage form using Product Service POST API
   * @param form to check whether contactForm is valid or not
   * To Do List....
   */
  ContactUS(){
    this.submitted = true;
    if(this.contactFormData.valid){
      let sub1 = this.service.contactUsForm(this.contactFormData.value).subscribe({
        next: (res:any) => { 
          this.submitted = false;
          res.type == 'success'?this.toastr.success(res.message):this.toastr.warning(res.message); 
        },
        error: (err:any) => { console.log("Contact Form Error", err); },
        complete: () => { 
          this.contactFormData.reset(); 
          this.cdr.markForCheck(); 
        }
      });
      this.subscription.push(sub1);
    }
  };
  
  // Set Breadcrumb in Product Service
  getBreadcrumb(){
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Contact', url: 'contact' },
    ]);
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
