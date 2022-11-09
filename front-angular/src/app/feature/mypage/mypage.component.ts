import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { onAuthStateChanged, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  constructor(
    protected userService: UserService,
    private auth: Auth,
  ) { }

  ngOnInit(): void {
    onAuthStateChanged(this.auth, (user) => {
      if(user) {
        this.userService.currentUser.displayName = user.displayName;
        this.userService.currentUser.photoURL = user.photoURL;
      }
    });
    console.log(this.userService.currentUser);
  }

}
