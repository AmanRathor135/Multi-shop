import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnDestroy {
  subscription: Subscription[] = [];
  submitted: boolean = false;
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr:ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  // Using form in HTML as a loginForm.controls
  get form(): { [key: string]: AbstractControl } {
    return this.forgotPasswordForm.controls;
  }

  // reset password
  resetPassword() {
    this.submitted = false;
    if (this.forgotPasswordForm.valid) {
      let sub1 = this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
          next: (res: any) => {
            if (res.type == 'success') {
              this.toastr.success(res.message);
            }
          },
          error: (err: any) => { console.log('Reset Password Error', err); },
          complete: () => { this.cdr.markForCheck(); },
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
