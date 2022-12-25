import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { PictureService } from '../../../feature/service/picture.service';
import { tap } from 'rxjs';


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
    this.userService.getUserInfo();

    this.pictureService.getUserPictures()
      .pipe(
        tap((data) => {
          this.userPictures = data;
          console.log(this.userPictures);
        })
      )
      .subscribe({
        error: (error) => console.log(error),
        complete: () => {
          console.log('Get Userphoto!')
        }
      });
  }

}
