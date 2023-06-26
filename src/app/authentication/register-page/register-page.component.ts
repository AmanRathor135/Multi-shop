import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnDestroy {
  subscription: Subscription[] = [];
  submitted: boolean = false;
  language: any[] = [
    { id: 'EN', name: 'English' },
    { id: 'HI', name: 'Hindi' },
    { id: 'FR', name: 'France' },
    { id: 'AR', name: 'Arabic' },
    { id: 'GU', name: 'Gujarati' },
  ];

  gender:any[] = [{name:'Male'},{name:'Female'},{name:'Other'}]

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,12}'
      ),
    ]),
    timeZone: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(14),
    ]),
    gender: new FormControl('Male', [Validators.required]),
    language: new FormControl('English', [Validators.required]),
  });

  constructor(
    private service: ProductService,
    private authService: AuthService,
    private router:Router,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {
    service.Breadcrumb.next([]);
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
  }

  // Using form in HTML as a registrationForm.controls
  get form(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  };

  createAccount() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      let sub1 = this.authService.SignUp(this.registrationForm.value).subscribe({
          next: (res: any) => {
            { res.type == 'success' ? this.toastr.success(res.message) : this.toastr.warning(res.message); }
          },
          error: (err: any) => { console.log('Registration Form Error', err); },
          complete: () => { 
            this.router.navigate(['/auth/login'])
            this.cdr.markForCheck(); },
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
