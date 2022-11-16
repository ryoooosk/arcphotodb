import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../core/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  protected user = {email: '', password: ''};

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    // this.user = form.value;
    // ↑[(ngModel)]を使ってるので既にuserに<input>の値が代入されているので不必要
    this.userService.login(this.user.email, this.user.password);
  }

}
