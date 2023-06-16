import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartDetailPageRoutingModule } from './cart-detail-page-routing.module';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SpecificOrderDetailComponent } from './specific-order-detail/specific-order-detail.component';


@NgModule({
  declarations: [
    MyCartComponent,
    CheckoutComponent,
    OrderHistoryComponent,
    SpecificOrderDetailComponent,
  ],
  imports: [
    CommonModule,
    CartDetailPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CartDetailPageModule { }
