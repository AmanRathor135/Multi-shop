import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactDetailFormComponent } from './contact-detail-form/contact-detail-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactDetailFormComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule
  ]
})
export class ContactModule { }
