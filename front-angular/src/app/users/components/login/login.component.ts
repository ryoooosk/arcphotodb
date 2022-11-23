import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected user = {email: '', password: ''};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    // this.user = form.value;
    // ↑[(ngModel)]を使ってるので既にuserに<input>の値が代入されているので不必要
    this.authService.login(this.user.email, this.user.password);
  }

}
