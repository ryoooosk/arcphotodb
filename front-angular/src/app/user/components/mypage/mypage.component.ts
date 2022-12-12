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

  protected userPictures: any;
  public userPicturesSrc: any = [];

  ngOnInit(): void {
    this.userService.getUserInfo();

    this.pictureService.getUserPhoto()
      .pipe(
        tap( (data) => {
          this.userPictures = data;
        }),
        tap( () => {
          for(let count = 0; count < this.userPictures.length; count++) {
            this.userPicturesSrc.push(this.userPictures[count].path);
          }
        }),
      )
      .subscribe({
        error: (error) => console.log(error),
        complete: () => {
          console.log('Get Userphoto!')
        }
      });
  }

}
