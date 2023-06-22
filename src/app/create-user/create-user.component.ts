import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  public branches: string[] = ["Thane", "Mulund", "Bhandup", "Airoli", "Vashi", "Nerul", "Belapur", "Panvel"];
  public codes: string[] = ["101", "102", "103"];

  userForm!: FormGroup;

  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.userForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      branch: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      accountDate: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      martialStatus: new FormControl('', Validators.required),
      employmentStatus: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  submitForm() {
    this.userService.insertUser(this.userForm.value)
      .then(() => {
        this.toastr.success(`${this.userForm.controls['firstName'].value} created successfully`);
        this.router.navigate(['/list']);
      })
      .catch((error) => {
        this.toastr.error('Error: ' + error.message, 'Failed to create user');
      });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get mobile() {
    return this.userForm.get('mobile');
  }

  get branch() {
    return this.userForm.get('branch');
  }

  get code() {
    return this.userForm.get('code');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get accountDate() {
    return this.userForm.get('accountDate');
  }

  get address1() {
    return this.userForm.get('address1');
  }

  get address2() {
    return this.userForm.get('address2');
  }

  get martialStatus() {
    return this.userForm.get('martialStatus');
  }

  get employmentStatus() {
    return this.userForm.get('employmentStatus');
  }
}
