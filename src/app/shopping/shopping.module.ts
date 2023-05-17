import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FilterByPriceComponent } from './filter-by-price/filter-by-price.component';
import { FilterByColorComponent } from './filter-by-color/filter-by-color.component';
import { FilterBySizeComponent } from './filter-by-size/filter-by-size.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDescriptionComponent } from './product-description/product-description.component';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    ShopComponent,
    ShopDetailsComponent,
    FilterByPriceComponent,
    FilterByColorComponent,
    FilterBySizeComponent,
    ProductListComponent,
    PaginationComponent,
    ImageCarouselComponent,
    ProductDetailComponent,
    ProductDescriptionComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    CarouselModule,
    TabsModule.forRoot()
    // IvyCarouselModule
  ]
})
export class ShoppingModule { }
