import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private http: HttpClient
  ) { }

  private apiUrl = 'http://localhost/api/image';
  private httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'application/json'
    })
  };

  public tagPictures: any;

  public tagsData: {
    tags: string[],
    picture_id: any
  } = {
    tags: [],
    picture_id: ''
  };

  getPictures(tags: any): Observable<any> {
    const url = `${this.apiUrl}/get/tags`;
    return this.http.post(url, tags, this.httpOption);
  }

  getAllPictures(): Observable<any> {
    const url = `${this.apiUrl}/all`;
    return this.http.get(url);
  }

}
