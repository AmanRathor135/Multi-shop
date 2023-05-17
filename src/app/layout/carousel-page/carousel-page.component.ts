import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel-page',
  templateUrl: './carousel-page.component.html',
  styleUrls: ['./carousel-page.component.scss']
})
export class CarouselPageComponent {

  carousel:any = [
    {
      title:'Men Fashion',
      imgSrc:'assets/img/carousel-1.jpg',
      desc:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      btnName:'Shop Now'
    },
    {
      title:'Women Fashion',
      imgSrc:'assets/img/carousel-2.jpg',
      desc:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      btnName:'Shop Now'
    },
    {
      title:'Kids Fashion',
      imgSrc:'assets/img/carousel-3.jpg',
      desc:'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam',
      btnName:'Shop Now'
    },
  ];

  offerZone:any = {
    savings:'Save 20%',
    type:'Special Offer',
    btnName:'Shop Now',
    imgSrc:['assets/img/offer-1.jpg', 'assets/img/offer-2.jpg']
  }

}
