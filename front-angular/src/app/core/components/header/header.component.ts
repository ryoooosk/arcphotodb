import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: Auth,
    protected userService: UserService
  ) { }

  protected isLogin: boolean | undefined;

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      // 真偽値に変換する
      this.isLogin = !!user;
      if(user) {
        this.userService.getUserInfo();
      };
    })
  }

  logout(): void {
    this.userService.logout();
  }

}
