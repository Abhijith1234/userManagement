import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  isUserIdInUrl;
  formGroup: FormGroup;
  appinessUserData;
  skills = ['angular', 'node', 'java', 'c++'];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.id) {
        this.isUserIdInUrl = params.id;
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.getUserDataFromLocalSt();
  }

  getUserDataFromLocalSt() {
    this.appinessUserData = JSON.parse(localStorage.getItem('appinessUserData')) || [];
    if (this.isUserIdInUrl) {
      this.setForm();
    }
  }

  setForm() {
    const toBeEditedUser = this.appinessUserData[this.isUserIdInUrl];
    this.formGroup.controls['name'].setValue(toBeEditedUser.name);
    this.formGroup.controls['phone'].setValue(toBeEditedUser.phone);
    this.formGroup.controls['email'].setValue(toBeEditedUser.email);
    this.formGroup.controls['skills'].setValue(toBeEditedUser.skills);
    this.formGroup.controls['date'].setValue(toBeEditedUser.date);
    this.formGroup.controls['description'].setValue(toBeEditedUser.description);
  }

  createForm() {
    const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.pattern(/^[a-z ,.'-]+$/i)]],
      'phone': [null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'skills': [null, Validators.required],
      'date': [null, Validators.required],
      'description': [null, Validators.required]
    });
  }

  validateEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Field is required' :
      this.formGroup.get('email').hasError('pattern') ? 'Not a valid email address' : '';
  }

  validatePhone() {
    return this.formGroup.get('phone').hasError('required') ? 'Field is required' :
      this.formGroup.get('phone').hasError('pattern') ? 'please type only numbers' :
        this.formGroup.get('phone').hasError('minlength') ? 'Minimum 10 digit' : '';
  }

  validateName() {
    return this.formGroup.get('name').hasError('required') ? 'Field is required' :
      this.formGroup.get('name').hasError('pattern') ? 'please type only alphabets' : '';
  }


  async submit(form) {
    if (this.isUserIdInUrl) {
      this.appinessUserData[this.isUserIdInUrl] = form;
    } else {
      this.appinessUserData.push(form);
    }
    await localStorage.setItem('appinessUserData', JSON.stringify(this.appinessUserData));
    await alert('user Saved');
    this.router.navigate(['allUser']);
  }

}
