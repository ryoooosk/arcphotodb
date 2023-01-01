import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  private apiUrl = 'http://localhost/api/image';
  private httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'application/json'
    })
  };

  private favoriteData: {
    picture_id: string[]
  } = {
    picture_id: [],
  }

  changeFavorite(id: []) {
    this.favoriteData.picture_id = id;
    const url = `${this.apiUrl}/${this.userService.currentUser.uid}/favorite/set`;
    return this.http.post(url, id, this.httpOption);
  }

  getUserFavorites() {
    const url = `${this.apiUrl}/${this.userService.currentUser.uid}/favorite/all`;
    return this.http.get(url);
  }

}
