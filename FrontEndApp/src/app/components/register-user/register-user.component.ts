import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { userForm } from '../models/user';
import { UsersService } from 'src/app/services/users.service';
import { delay } from 'rxjs/operators';

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
    this.save();
    employeeForm.resetForm();
  }

  save() {
    const formdata = new FormData;
    formdata.append("jsonData", JSON.stringify(this.user));
    console.log(formdata)
    this.usersService
      .createUser(formdata).subscribe(data => {
        let d1 = JSON.stringify(data);
        let d2 = JSON.parse(d1);
        console.log(d2);
        if (d2.statusCode == 302) {
          alert(d2.message);
        }
        else {
          this.submitted = true;
          delay(2000)
          this.gotoHome();
        }
      },
        error => console.log(error));
  }


  gotoHome() {
    this.router.navigate(['/'])
  }
  cancel() {
    this.location.back();
  }
  

}
