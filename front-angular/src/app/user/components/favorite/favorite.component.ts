import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { PictureService } from '../../../feature/service/picture.service';
import { tap } from 'rxjs';
import { FavoriteService } from '../../../feature/service/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(
    protected userService: UserService,
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo();
    this.getUserFavorites();
  }

  protected favoritePictures: any;

  getUserFavorites() {
    this.favoriteService.getUserFavorites()
    .pipe(
      tap((data) => {
        this.favoritePictures = data;
        console.log(this.favoritePictures);
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
