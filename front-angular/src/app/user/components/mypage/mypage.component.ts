import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { PictureService } from '../../../feature/service/picture.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  constructor(
    protected userService: UserService,
    private pictureService: PictureService
  ) { }

  public userPictures: any;

  ngOnInit(): void {

    this.pictureService.getUserPictures()
      .subscribe((data) => this.userPictures = data);

  }

}
