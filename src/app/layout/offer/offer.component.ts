import { Component } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent {

  offerZone:any = {
    savings:'Save 20%',
    type:'Special Offer',
    btnName:'Shop Now',
    imgSrc:['assets/img/offer-1.jpg', 'assets/img/offer-2.jpg']
  }

}
