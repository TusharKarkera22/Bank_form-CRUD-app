import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  
  public branches: string[] = ["Thane", "Mulund", "Bhandup", "Airoli", "Vashi", "Nerul", "Belapur", "Panvel"];
  public codes: string[] = ["101", "102", "103"];
  public userForm!: FormGroup;
  

  constructor(
    public toastr: ToastrService,
    public formBuilder: FormBuilder,
    public userService: UserService,
  ) {
    this.userForm = this.createForm();
  }


  ngOnInit(){
    this.userService.getUsersList();
    
  }

  createForm() {
    return this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ],
    ],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    branch: ['', Validators.required],
    code: ['', Validators.required],
    gender: ['', Validators.required],
    accountDate: ['', Validators.required],
    address1: ['', Validators.required],
    address2: [''],
    martialStatus: ['', Validators.required],
    employmentStatus: ['', Validators.required],

    });
  }
  resetForm(){

    this.userForm.reset();

  }

  submitForm(){

    this.userService.insertUser(this.userForm.value);

    this.toastr.success(

      this.userForm.controls['firstName'].value + " added successfully"

    );

  }

  get firstName(){

    return this.userForm.get('firstName');

  }

  get lastName(){
    return this.userForm.get('lastName');
  }

  get email(){
    return this.userForm.get('email');
  }

  get mobile(){
    return this.userForm.get('mobile');
  }

  get branch(){
    return this.userForm.get('branch');
  }

  get code(){
    return this.userForm.get('code');
  }
  get gender(){
    return this.userForm.get('gender');
  }

  get accountDate(){  
    return this.userForm.get('accountDate');
  }

  get address1(){
    return this.userForm.get('address1');
  }

  get address2(){
    return this.userForm.get('address2');
  }

  get martialStatus(){
    return this.userForm.get('martialStatus');
  }

  get employmentStatus(){
    return this.userForm.get('employmentStatus');

  }


}




