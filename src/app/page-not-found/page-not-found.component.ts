import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
  constructor(private service:ProductService) {
    /**
     * Set Breadcrumb in Product Service
     */
    service.Breadcrumb.next([]);
  }
}
