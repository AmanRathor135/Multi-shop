import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductListComponent } from './product-list/product-list.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FilterPipe } from './product-list/filter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ShopComponent,
    ShopDetailsComponent,
    ProductListComponent,
    ImageCarouselComponent,
    ProductDetailComponent,
    ProductDescriptionComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    CarouselModule,
    TabsModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    NgbDropdownModule
  ],
  exports:[]
})
export class ShoppingModule { }
