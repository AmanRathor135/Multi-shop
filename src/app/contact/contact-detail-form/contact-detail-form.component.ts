import { Component } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-contact-detail-form',
  templateUrl: './contact-detail-form.component.html',
  styleUrls: ['./contact-detail-form.component.scss'],
})
export class ContactDetailFormComponent {

  favItemLength:any;
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
    address: "",
  }

  
  constructor(private service:ProductService){
    let list:any = localStorage.getItem('favoriteItemList');
    this.favItemLength = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.favItemLength.length);
    service.Breadcrumb.next([
      {
        pageTitle: 'Home',
        url: '',
      },
      {
        pageTitle: 'Contact',
        url: 'contact',
      },
    ]);
  }

  sendMessage(){

  }
}
