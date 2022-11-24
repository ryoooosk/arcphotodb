import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { UserService } from '../../../shared/service/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: Auth,
    protected userService: UserService,
  ) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      // 真偽値に変換する
      this.userService.isLogin = !!user;
      if(user) {
        this.userService.getUserInfo();
      };
    })
  }

}
