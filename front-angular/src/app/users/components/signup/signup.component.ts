import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/service/user.service';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  protected user = {email: '', password: ''};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signupEmail(form: NgForm): void {
    this.user = form.value;
    alert(`下記の内容で登録します。\nEmail: ${this.user.email}\nPassword: ${this.user.password}`);
    this.authService.createUserEmail(this.user.email, this.user.password)
      .then(() => {
        console.log('Complete SignUp!');
        this.router.navigateByUrl('/signup/newuser');
      });
  }

  signupGoogle(): void {
    this.authService.createUserGoogle();
  }

}
