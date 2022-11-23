import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  constructor(
    protected userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
