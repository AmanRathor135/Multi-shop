import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  subscription: Subscription[] = [];
  submitted: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: ProductService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    service.Breadcrumb.next([]);
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
  }

  // Using form in HTML as a loginForm.controls
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Login Credentials
  // E-mail:aman@gmail.com  ||  Password:Am@123456
  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      let sub1 = this.authService.SignIn(this.loginForm.value).subscribe({
        next: (res: any) => {
          this.service.isLoggedIn.next(true);
          localStorage.setItem('token', res.data.token);
          res.type == 'success' ? this.toastr.success(res.message) : this.toastr.warning(res.message);
        },
        error: (err: any) => {
          this.toastr.error(err.error.message);
          console.log('Login Error', err);  
        },
        complete: () => {
          this.router.navigate(['/']).then(() => { window.location.reload(); });
          this.cdr.markForCheck();
        },
      });
      this.subscription.push(sub1);
    }
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
