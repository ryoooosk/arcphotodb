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

  private myFormData = new FormData();

  public tagsData: {
    tags: string[],
    picture_id: any
  } = {
    tags: [],
    picture_id: ''
  };

  storeImage(image: File, tags: string[]): Observable<any> {
     // ↑で最初からheaders入ってるとなぜかダメで↓でappendだとうまくいく
    this.httpOption.headers.append('Content-Type', 'multipart/form-data');
    this.httpOption.headers.append('Accept', 'application/json');
    // appendはHttpHeadersのインスタンスを返す
    // ↓appendの第一引数がkeyになる
    this.myFormData.append('image', image);
    this.tagsData.tags = tags;

    const url = `${this.apiUrl}/${this.userService.currentUser.uid}/store`;
    return this.http.post(url, this.myFormData, this.httpOption)
      .pipe(
        tap((response: any) => {
          const picture_id: number = response['picture_id'];
          this.postTag(picture_id)
            .subscribe((response) => console.log(response));
        }),
      );
  }

  postTag(picture_id: number): Observable<object> {
    this.tagsData.picture_id = picture_id;
    const url = `${this.apiUrl}/${this.userService.currentUser.uid}/store/tags`;
    return this.http.post(url, this.tagsData, this.httpOption)
  }

  getUserPictures() {
    const url = `${this.apiUrl}/${this.userService.currentUser.uid}/userpicture/all`;
    return this.http.get(url, this.httpOption)
  }

  getUserPicture(id: any) {
    const url = `${this.apiUrl}/userpicture/${id}`
    return this.http.get(url, this.httpOption)
  }

  deletePicture(id: any) {
    const url = `${this.apiUrl}/${this.userService.currentUser.uid}/userpicture/${id}/delete`
    return this.http.delete(url, this.httpOption)
      .pipe(
        tap((response) => console.log(response))
      );
  }


}
