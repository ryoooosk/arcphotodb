import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../../service/picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  constructor(
    private pictureService: PictureService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUserPicture();
  }

  public userPicture: any;

  // 一つ前の画面に戻る
  goBack() {
    this.location.back();
  }

  getUserPicture() {
    // ↓の式には+をつけない
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.pictureService.getUserPicture(id)
      .subscribe((response) => {
        console.log(response),
        this.userPicture = response;
        console.log('Get Picture!')
      });
  }

  deletePicture() {
    const id = this.userPicture.id;
    alert("写真を削除します。よろしいですか？");
    this.pictureService.deletePicture(id)
      .subscribe({
        error: (error) => console.log(error),
        complete: () => {
          console.log('Delte userpicture success!'),
          this.router.navigateByUrl('/mypage');
        }
    });
  }

}
