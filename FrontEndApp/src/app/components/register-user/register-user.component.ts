import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { userForm } from '../models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {

  submitted = false;
  user:any = userForm;
  uploadForm!: FormGroup;

  constructor(private router: Router, private usersService: UsersService, private location: Location,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(employeeForm: NgForm) {
    console.log(this.user);
    employeeForm.resetForm();
  }


  gotoHome() {
    this.router.navigate(['/default/employeelist'])
  }
  cancel() {
    this.location.back();
  }
  

}
