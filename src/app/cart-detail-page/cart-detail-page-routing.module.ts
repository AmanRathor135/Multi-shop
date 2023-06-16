import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SpecificOrderDetailComponent } from './specific-order-detail/specific-order-detail.component';

const routes: Routes = [
  {
    path:'my-cart', component:MyCartComponent
  },
  {
    path:'checkout', component:CheckoutComponent
  },
  {
    path:'order-history', component:OrderHistoryComponent
  },
  {
    path:'order-detail', component:SpecificOrderDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartDetailPageRoutingModule { }
