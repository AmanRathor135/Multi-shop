import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    NavBarComponent,
    FooterComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    NgbDropdownModule,
    ToastrModule.forRoot({
      timeOut: 1000, 
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated:true, autoClose: true,} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
