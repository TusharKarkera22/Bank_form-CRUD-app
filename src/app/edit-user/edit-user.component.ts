import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public branches: string[] = ["Thane", "Mulund", "Bhandup", "Airoli", "Vashi", "Nerul", "Belapur", "Panvel"];
  public codes: string[] = ["101", "102", "103"];
  
  userForm!: FormGroup;


  constructor(
    public userService: UserService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,  
  ) { 
    this.userForm = this.createForm();
  }

  createForm() {
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

ngOnInit() {
  const id = this.activeRoute.snapshot.paramMap.get('id');
  if (id !== null) {
    this.userService.getUserById(id).valueChanges().subscribe(data => {
      if (data) {
        this.userForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          mobile: data.mobile,
          branch: data.branch,
          code: data.code,
          gender: data.gender,
          accountDate: data.accountDate,
          address1: data.address1,
          address2: data.address2,
          martialStatus: data.martialStatus,
          employmentStatus: data.employmentStatus
        });
      }
    });
  }
}

submitForm(){

  this.userService.updateUser(this.userForm.value);

  this.toastr.success(

    this.userForm.controls['firstName'].value + " added."

  );

  this.router.navigate(['/list']);

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



  