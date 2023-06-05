import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class RegisterPageComponent {

  submitted:boolean = false;
  language:any[] = [
    {
      id:'EN',
      name:'English'
    },
    {
      id:'HI',
      name:'Hindi'
    },
    {
      id:'FR',
      name:'France'
    },
    {
      id:'AR',
      name:'Arabic'
    },
    {
      id:'GU',
      name:'Gujarati'
    },
  ];

  registrationForm:FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,12}')]),
    timeZone: new FormControl('', [Validators.required]),
    mobile: new FormControl('', 
    [Validators.required,
      // Validators.pattern('^[0-9]+$'),
      Validators.minLength(9),Validators.maxLength(14),]),
    gender: new FormControl('',[Validators.required]),
    language: new FormControl('English', [Validators.required]),
    address: new FormGroup({
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl(null, [Validators.required,Validators.pattern('^[0-9]+$'),Validators.minLength(4),Validators.maxLength(8)]),
    })
  });

  constructor(private service:ProductService, private toastr:ToastrService, private cdr:ChangeDetectorRef){
    service.Breadcrumb.next([]);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  };

  createAccount(){
    this.submitted = true;
    if(this.registrationForm.valid){
      console.log("value", this.registrationForm.value);
      this.service.SignUp(this.registrationForm.value).subscribe({
        next: (res:any) => { { res.type == 'success'?this.toastr.success(res.message):this.toastr.warning(res.message); } },
        error: (err:any) => { console.log("Registration Form Error", err); },
        complete: () => { this.cdr.markForCheck();}
      });
    }
  };
}
