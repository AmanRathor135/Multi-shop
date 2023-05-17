import { Component } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss'],
})
export class ProductDescriptionComponent {
  category: any;
  Tabs: any[] = ['Description', 'Information', 'Reviews (0)'];

  tabList: any[] = [
    {
      tab: 'Description',
      title: 'Product Description',
      desc:
       [ 'Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.',
        'Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.'],
    },
    {
      tab: 'Information',
      title: 'Additional Information',
      desc: ['Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.'],
      lists: [
        'Sit erat duo lorem duo ea consetetur, et eirmod takimata.',
        'Amet kasd gubergren sit sanctus et lorem eos sadipscing at.',
        'Duo amet accusam eirmod nonumy stet et et stet eirmod.',
        'Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.',
      ],
    },
    {
      tab: 'Reviews (0)',
      title: '1 review for "Product Name"',
      imgSrc: 'assets/img/user.jpg',
      name: 'John Doe',
      date: '01 Jan 2045',
      icons: [
        'fas fa-star',
        'fas fa-star',
        'fas fa-star',
        'fas fa-star-half-alt',
        'far fa-star',
      ],
      desc: ['Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.'],
    },
  ];

  // descriptionTab: any = {
  //   title: 'Product Description',
  //   desc1:
  //     'Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.',
  //   desc2:
  //     'Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna takimata justo et amet magna et.',
  // };

  // informationTab: any = {
  //   title: 'Additional Information',
  //   desc: 'Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit sanctus diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod takimata dolor ea invidunt.',
  //   lists: [
  //     'Sit erat duo lorem duo ea consetetur, et eirmod takimata.',
  //     'Amet kasd gubergren sit sanctus et lorem eos sadipscing at.',
  //     'Duo amet accusam eirmod nonumy stet et et stet eirmod.',
  //     'Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.',
  //   ],
  // };

  // reviewTab: any = {
  //   title: '1 review for "Product Name"',
  //   imgSrc: 'assets/img/user.jpg',
  //   name: 'John Doe',
  //   date: '01 Jan 2045',
  //   icons: [
  //     'fas fa-star',
  //     'fas fa-star',
  //     'fas fa-star',
  //     'fas fa-star-half-alt',
  //     'far fa-star',
  //   ],
  //   desc: 'Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.',
  // };

  constructor() {}
}
