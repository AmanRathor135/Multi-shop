import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  submitted:boolean = false;
  resetId!:string;

  resetPasswordForm: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,12}'),
    ]),
    conformPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,12}'),
    ]),
  });

  constructor(private activeRoute:ActivatedRoute, private authService:AuthService, private toastr:ToastrService, private router:Router) {
    this.getActiveRouteId();    
  }

  getActiveRouteId(){
    this.activeRoute.paramMap.subscribe((res:any) => {
      this.resetId = res.params.uuid;
    });
  };

  // Using form in HTML as a loginForm.controls
  get form(): { [key: string]: AbstractControl } {
    return this.resetPasswordForm.controls;
  };

  setNewPassword(){
    this.submitted = true;
    this.resetPasswordForm.value['uuid']=this.resetId;
    console.log("xwefv", this.resetPasswordForm.value);
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res:any) => { 
        if(res.type == 'success'){
          this.toastr.success(res.data);
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err:any) => { console.log("Reset Password Error", err); }, 
      complete: () => {} 
    })
  };
}
