import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';

const routes: Routes = [
  {
    path:'', component:ShopComponent
  },
  {
    path:'shop/:id', component:ShopComponent
  },
  {
    path:'Shop-details', component:ShopDetailsComponent
  },
  {
    path:'Shop-details/:id', component:ShopDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
