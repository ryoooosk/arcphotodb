import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
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
    this.getUserFavorites();
  }

  protected favoritePictures: any;

  getUserFavorites() {
    this.favoriteService.getUserFavorites()
    .subscribe((data) => this.favoritePictures = data)
  }

}
