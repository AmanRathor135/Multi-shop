import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./layout/layout.module').then( m => m.LayoutModule)
  },
  {
    path:'Shop',
    loadChildren: () => import('./shopping/shopping.module').then( m => m.ShoppingModule)
  },
  {
    path:'cart-detail',
    loadChildren: () => import('./cart-detail-page/cart-detail-page.module').then( m => m.CartDetailPageModule)
  },
  {
    path:'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactModule)
  },
  {
    path:'page-not-found', component:PageNotFoundComponent
  },
  {
    path:'**', component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
