import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = { loginType: '', userName: '', password: '' };
  loginForm:any;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {

  }

  async onSubmit() {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('User:', this.user);
    localStorage.setItem("loginCredential", JSON.stringify(this.user));
    this.userService.loginUser(this.user).subscribe(data => {
      localStorage.setItem("approvedCredential", JSON.stringify(data));
      sessionStorage.setItem("approvedCredential", JSON.stringify(data));
      var user = JSON.parse(localStorage.getItem("approvedCredential") || '{}');
      console.log(user);

      if (user.status == 302) {
        alert("Invalid password. Please try again.");
        this.isLoading = false;
      }
      else if (user.status == 303) {
        alert(user.message);
        this.isLoading = false;
      }
      else {
        this.router.navigate(["/default"]);
        this.isLoading = false;
      }
    },
      err => alert("Invalid credentials. Please try again."));
  }

}
