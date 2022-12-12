import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
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

  private apiUrl = 'http://localhost/api/image';
  private httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'application/json'
    })
  };
  private myFormData = new FormData();

  storeImage(image: File): Observable<any> {
    // ↑で最初からheaders入ってるとなぜかダメで↓でappendだとうまくいく
    this.httpOption.headers.append('Content-Type', 'multipart/form-data');
    this.httpOption.headers.append('Accept', 'application/json');
    // appendはHttpHeadersのインスタンスを返す

    // ↓appendの第一引数がkeyになる
    this.myFormData.append('image', image);

    const userUid = this.userService.currentUser.uid;

    return this.http.post(`${this.apiUrl}/${userUid}/store`, this.myFormData, this.httpOption)
      .pipe(
        tap((response) => console.log(response)),
      );
  }

  getUserPhoto() {
    const userUid = this.userService.currentUser.uid;

    return this.http.get(`${this.apiUrl}/${userUid}/userphoto`, this.httpOption)
  }
}
