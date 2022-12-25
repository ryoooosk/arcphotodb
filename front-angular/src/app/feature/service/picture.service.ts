import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../../shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public apiUrl = 'http://localhost/api/image';
  public httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'application/json'
    })
  };
  private myFormData = new FormData();
  private tagsData: {
    tags: string[],
    picture_id: any
  } = {
    tags: [],
    picture_id: ''
  };

  private favoriteData: {
    picture_id: string[]
  } = {
    picture_id: [],
  }

  storeImage(image: File, tags: string[]): Observable<any> {
     // ↑で最初からheaders入ってるとなぜかダメで↓でappendだとうまくいく
    this.httpOption.headers.append('Content-Type', 'multipart/form-data');
    this.httpOption.headers.append('Accept', 'application/json');
    // appendはHttpHeadersのインスタンスを返す
    // ↓appendの第一引数がkeyになる
    this.myFormData.append('image', image);
    this.tagsData.tags = tags;

    const userUid = this.userService.currentUser.uid;
    return this.http.post(`${this.apiUrl}/${userUid}/store`, this.myFormData, this.httpOption)
      .pipe(
        tap((response: any) => {
          const picture_id = response['picture_id'];
          this.tagsData.picture_id = picture_id;
          console.log(this.tagsData);

          this.http.post(`${this.apiUrl}/${userUid}/store/tags`, this.tagsData, this.httpOption)
            .subscribe((response) => console.log(response));
        }),
      );
  }

  setFavorite(id: []) {
    const userUid = this.userService.currentUser.uid;
    this.favoriteData.picture_id = id;
    return this.http.post(`${this.apiUrl}/${userUid}/favorite`, this.favoriteData);
  }

  getUserPictures() {
    const userUid = this.userService.currentUser.uid;
    return this.http.get(`${this.apiUrl}/${userUid}/userpicture/all`, this.httpOption)
  }

  getUserFavorites() {
    const userUid = this.userService.currentUser.uid;
    return this.http.get(`${this.apiUrl}/${userUid}/favorite/all`);
  }

  getUserPicture(id: any) {
    return this.http.get(`${this.apiUrl}/userpicture/${id}`, this.httpOption)
  }

  deletePicture(id: any) {
    const userUid = this.userService.currentUser.uid;
    return this.http.delete(`${this.apiUrl}/${userUid}/userpicture/${id}/delete`, this.httpOption)
      .pipe(
        tap((response) => console.log(response))
      );
  }


}
