import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Multi-shop-app';
  helper:any = new JwtHelperService();
  token:any;
  decodeToken:any;
  expirationTimeMinutes:any;
  expirationTimeHours:any;
  currentTime:any;

    // TO STORE CURRENCY PRICE IN LOCAL STORAGE
    //
    // let data = {AUD: 1.512142, BGN: 1.825903, BRL: 4.927105, CAD: 1.344878, CHF: 0.906006,CNY: 7.106011,CZK: 21.981741,  
    //   DKK: 6.954169, EUR: 0.933581, GBP: 0.804341, HKD:7.837993, HRK:7.034068, HUF:344.72047, IDR:14855.017822, 
    //   ILS:3.740192, INR:82.511561, ISK:140.890166, JPY:139.384743, KRW:1300.791543, MXN:17.464024,PHP:56.185074,  
    //   MYR:4.577505, NOK:11.038068, NZD:1.647488, PLN:4.179355, RON:4.634406, RUB:80.600129, SEK:10.851886, SGD:1.349347,
    //   THB:34.770049, TRY:21.274528, USD:1, ZAR:19.276237}
    //   localStorage.setItem('currencyPrice', JSON.stringify(data));

    constructor(private authService:AuthService) {}

    ngOnInit(): void {
      this.token = localStorage.getItem('token');
      if (this.token) {
        this.decodeToken = this.helper.decodeToken(this.token);
        this.expirationTimeHours = (new Date(this.decodeToken?.exp*1000).getHours() - new Date().getHours())*3600*1000;
        this.expirationTimeMinutes = (new Date(this.decodeToken?.exp*1000).getMinutes() - new Date().getMinutes()) - 1;
        console.log("Expiration Time",this.expirationTimeMinutes, "Minutes Remain");
      
        setTimeout(() => {
          this.checkTimeToRefreshToken();
        }, this.expirationTimeHours + this.expirationTimeMinutes*60*1000);
        
        this.expirationTimeHours = (new Date(this.decodeToken?.exp*1000).getHours() - new Date().getHours())*3600*1000;
        this.expirationTimeMinutes = (new Date(this.decodeToken?.exp*1000).getMinutes() - new Date().getMinutes()) - 1; 
      }
    }

    checkTimeToRefreshToken(){
      this.authService.refreshToken().subscribe({
        next: (res:any) => {
          localStorage.setItem('token',res.data.token);
        },
        error: (err:any) => { console.log('Refreshing Token Error', err); },
        complete: () => { console.log("Token Generated Successfully!"); }
      });      
    };
}

