import { Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  
searchText:any;
topBarList1:any[] = ["About","Contact","Help","FAQs"]

DropDownMenu:any[] = [
  {
    menu:'My Account',
    data: ['Sign in','Sign up']
  },
  {
    menu:'USD',
    data: ["EUR","GBP","CAD"]
  },
  {
    menu:'En',
    data: ["FR","AR","RU"]
  },
];

details:any = {
  first:'multi',
  last:'shop',
  service:'Customer Service',
  phone:'+012 345 6789'
}

}
