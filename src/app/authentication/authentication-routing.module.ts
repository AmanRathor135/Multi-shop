import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login', pathMatch:'full'
  },
  {
    path:'login', component:LoginPageComponent
  },
  {
    path:'register', component:RegisterPageComponent
  },
  {
    path:'forgot-password', component:ForgotPasswordComponent
  },
  {
    path:'reset-password', component:ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
