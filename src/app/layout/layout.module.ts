import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { CarouselPageComponent } from './carousel-page/carousel-page.component';
import { FeatureComponent } from './feature/feature.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsFeaturedComponent } from './products-featured/products-featured.component';
import { OfferComponent } from './offer/offer.component';
import { ProductsRecentComponent } from './products-recent/products-recent.component';
import { VendorComponent } from './vendor/vendor.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FilterPipe } from '../shopping/product-list/filter.pipe';
import { FaqComponent } from './faq/faq.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductService } from '../services/product.service';


@NgModule({
  declarations: [
    HomePageComponent,
    CarouselPageComponent,
    FeatureComponent,
    CategoriesComponent,
    ProductsFeaturedComponent,
    OfferComponent,
    ProductsRecentComponent,
    VendorComponent,
    FaqComponent,
    WishlistComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CarouselModule
  ],
  exports: [ProductsFeaturedComponent]
})
export class LayoutModule { }
