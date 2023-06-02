import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
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
    mobile: new FormControl('', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.minLength(9),Validators.maxLength(12),]),
    gender: new FormControl('',[Validators.required]),
    language: new FormControl('English', [Validators.required]),
    address: new FormGroup({
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
    })
  });

  

  constructor(){}

  get form(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
}
