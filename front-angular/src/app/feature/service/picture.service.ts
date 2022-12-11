import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = 'http://localhost/api/image';
  public httpOption = {
    // HTTPヘッダとは、Webコンテンツの伝送に用いられるHTTPで、メッセージの前半にある制御情報を記した領域のこと。 WebサーバやWebブラウザが相手方に伝えたい情報を格納する部分で、利用者の目には直接触れない。
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private data = new FormData;

  storeImage(image: File): Observable<any> {
    var myFormData = new FormData();
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    myFormData.append('image', image);

    return this.http.post(`${this.apiUrl}/store`, myFormData, {headers: headers})
      .pipe(
        tap((response) => console.log(response)),
      );
  }
}
