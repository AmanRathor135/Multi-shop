import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  footerData: any = {
    title: 'Get In Touch',
    desc: 'No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor. Rebum tempor no vero est magna amet no',
    detail: [
      {
        icon: 'fa fa-map-marker-alt',
        data: '123 Street, New York, USA',
      },
      {
        icon: 'fa fa-envelope',
        data: 'info@example.com',
      },
      {
        icon: 'fa fa-phone-alt',
        data: '+012 345 67890',
      },
    ],
  };

  footerList: any[] = [
    {
      name: 'Quick Shop',
      icon: 'fa fa-angle-right',
      list: [
        'Home',
        'Our Shop',
        'Shop Detail',
        'Shopping Cart',
        'Checkout',
        'Contact Us',
      ],
    },
    {
      name: 'My Account ',
      icon: 'fa fa-angle-right',
      list: [
        'Home',
        'Our Shop',
        'Shop Detail',
        'Shopping Cart',
        'Checkout',
        'Contact Us',
      ],
    },
  ];

  footerNewsletter: any = {
    title: 'Newsletter',
    desc: 'Duo stet tempor ipsum sit amet magna ipsum tempor est',
    follow: 'Follow Us',
    data: [
      'fab fa-twitter',
      'fab fa-facebook-f',
      'fab fa-linkedin-in',
      'fab fa-instagram',
    ],
  };

  newsletterForm: any = {
    email: '',
  };
}
