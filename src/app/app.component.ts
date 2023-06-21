import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Multi-shop-app';
  helper: any = new JwtHelperService();
  token: any;
  decodeToken: any;
  expirationTime: any;
  currentTime: any;

  constructor( private authService: AuthService, private service: ProductService ) {
    // this.currencyValue();
  }

  ngOnInit(): void {
    this.checkTokenExpirationTime();
  }

  checkTokenExpirationTime() {
    let timeInterval = setInterval(() => {
      this.token = localStorage.getItem('token');
      if (this.token) {
        let decode: any = this.helper.decodeToken(this.token);
        this.expirationTime = new Date(decode.exp).getTime() - 60;
        this.currentTime = Math.floor(new Date().getTime() / 1000);
        this.expirationTime.toLocaleString('en-US', { hour12: false });
        this.currentTime.toLocaleString('en-US', { hour12: false });

        if (this.expirationTime <= this.currentTime) {
          this.checkTimeToRefreshToken(timeInterval);
        }
      }
    }, 1000);
  }

  checkTimeToRefreshToken(interval: any) {
    this.authService.refreshToken().subscribe({
      next: (res: any) => {
        if (res.type == 'success') {
          console.log(res);
          localStorage.setItem('token', res.data?.token);
        } else {
          clearInterval(interval);
        }
      },
      error: (err: any) => {
        console.log('Refreshing Token Error', err);
      },
      complete: () => {
        console.log('Token Generated Successfully!');
      },
    });
  }

  // TO STORE CURRENCY PRICE IN LOCAL STORAGE if API is not Working
  getCurrencyPrice() {
    let data = {
      AUD: 1.512142,
      BGN: 1.825903,
      BRL: 4.927105,
      CAD: 1.344878,
      CHF: 0.906006,
      CNY: 7.106011,
      CZK: 21.981741,
      DKK: 6.954169,
      EUR: 0.933581,
      GBP: 0.804341,
      HKD: 7.837993,
      HRK: 7.034068,
      HUF: 344.72047,
      IDR: 14855.017822,
      ILS: 3.740192,
      INR: 82.511561,
      ISK: 140.890166,
      JPY: 139.384743,
      KRW: 1300.791543,
      MXN: 17.464024,
      PHP: 56.185074,
      MYR: 4.577505,
      NOK: 11.038068,
      NZD: 1.647488,
      PLN: 4.179355,
      RON: 4.634406,
      RUB: 80.600129,
      SEK: 10.851886,
      SGD: 1.349347,
      THB: 34.770049,
      TRY: 21.274528,
      USD: 1,
      ZAR: 19.276237,
    };
    localStorage.setItem('currencyPrice', JSON.stringify(data));
  }

  // Set the Currency Price in Local Storage using Product Service
  currencyValue() {
    this.service.getCurrencyPrice().subscribe({
      next: (res: any) => {
        if (res) {
          localStorage.setItem('currencyPrice', JSON.stringify(res.data));
        } else {
          this.getCurrencyPrice();
        }
      },
    });
  }
}
