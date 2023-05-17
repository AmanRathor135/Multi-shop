import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailFormComponent } from './contact-detail-form/contact-detail-form.component';

const routes: Routes = [
  {
    path:'', component:ContactDetailFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
