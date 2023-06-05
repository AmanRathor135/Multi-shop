import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  submitted:boolean = false;
  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, ])
  })

  constructor(private service:ProductService, private toastr:ToastrService, private cdr:ChangeDetectorRef, private router:Router){
    service.Breadcrumb.next([]);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  };

  // email:aman@gmail.com
  // password:Am@123456

  login(){
    this.submitted = true;
    if(this.loginForm.valid){
      this.service.SignIn(this.loginForm.value).subscribe({
        next: (res:any) => {     
          localStorage.setItem('token',res.data.token);
          this.service.isLoggedIn.next(true);      
          { res.type == 'success'? this.toastr.success(res.message):this.toastr.warning(res.message); } 
        },
        error: (err:any) => { 
          this.toastr.error(err.error.message);
          console.log('Login Error', err);
        },
        complete: () => {
          this.router.navigate(['/'])
          this.cdr.markForCheck();
        }
      })
    }
  }
}
