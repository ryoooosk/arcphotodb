import { Injectable } from '@angular/core';
import { PictureService } from '../../feature/service/picture.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private pictureService: PictureService,
    private http: HttpClient
  ) { }

  private apiUrl = this.pictureService.apiUrl;
  private httpOption = this.pictureService.httpOption;

  private tagData = {
    tags: []
  }

  public tagPictures: any;
  public tagPicturesSrc: any = [];

  getPictures(tags: any): Observable<any> {
    const url = `${this.apiUrl}/get/tags`;
    this.tagData.tags = tags;
    return this.http.post(url, this.tagData, this.httpOption);
  }
}
