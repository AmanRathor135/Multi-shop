import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { FaqComponent } from './faq/faq.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'Home', pathMatch:'full'
  },
  {
    path:'Home', component:HomePageComponent
  },
  {
    path:'faq', component:FaqComponent
  },
  {
    path:'wishlist', component:WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
