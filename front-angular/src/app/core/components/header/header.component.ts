import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: Auth,
    protected userService: UserService,
    protected authService: AuthService
  ) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      // 真偽値に変換する
      this.userService.isLogin = !!user;
      if(user) {
        this.userService.getCurrentUser();
      };
    })
  }

  logout(): void {
    this.authService.logout();
  }

}
