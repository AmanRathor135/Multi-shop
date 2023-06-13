import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  title1 :string = 'Featured Products';
  title2 :string = 'Recent Products';

  constructor(private service:ProductService){
    this.service.isLoggedIn.next(true);
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();

    // Set Breadcrumb in Product Service
    service.Breadcrumb.next( [{ pageTitle: 'Home', url: ''}] );
  }
}
