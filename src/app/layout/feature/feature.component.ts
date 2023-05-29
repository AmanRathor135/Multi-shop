import { Component } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent {

  featureList:any[] = [
    { icon:'fa fa-check', category:'Quality Product' },
    { icon:'fa fa-shipping-fast', category:'Free Shipping' },
    { icon:'fas fa-exchange-alt', category:'14-Day Return' },
    { icon:'fa fa-phone-volume', category:'24/7 Support' }
  ];
}
