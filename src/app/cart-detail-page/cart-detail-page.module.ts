import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartDetailPageRoutingModule } from './cart-detail-page-routing.module';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    MyCartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartDetailPageRoutingModule
  ]
})
export class CartDetailPageModule { }
