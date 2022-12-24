import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../../service/picture.service';
import { UserService } from '../../../shared/service/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  constructor(
    private auth: Auth,
    private pictureService: PictureService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): any {
    this.auth.onAuthStateChanged((user) => {
      if(user) {
        this.userService.currentUser.displayName = user.displayName;
        this.userService.currentUser.photoURL = user.photoURL;
        this.userService.currentUser.uid = user.uid;
        this.userService.photoSrc = user.photoURL;
      }
      this.getUserPicture();
    })
  }

  public userPicture: any;
  protected matchUser: boolean;

  // 一つ前の画面に戻る
  goBack() {
    this.location.back();
  }

  getUserPicture() {
    // ↓の式には+をつけない
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return this.pictureService.getUserPicture(id)
      .subscribe((response) => {
        // responseには取得した画像データ
        this.userPicture = response;
        // 画像データのuidとアクセスしたユーザーのuidが同じなら削除ボタンを表示する
        if(this.userPicture.uid === this.userService.currentUser.uid) {
          this.matchUser = true;
          console.log('pictureUid = currentUid');
        } else {
          this.matchUser = false;
          console.log('pictureUid != currentUser');
        }
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
