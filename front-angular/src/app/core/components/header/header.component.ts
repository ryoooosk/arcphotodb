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
    private afAuth: Auth,
    protected userService: UserService
  ) { }

  protected isLogin: boolean | undefined;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      // 真偽値に変換する
      this.isLogin = !!user;
      if(user) {
        this.userService.currentUser.displayName = user.displayName;
        this.userService.currentUser.photoURL = user.photoURL;
      };
    })
  }

}
