import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../../service/picture.service';
import { UserService } from '../../../shared/service/user.service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { FavoriteService } from '../../service/favorite.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.css']
})
export class PictureComponent implements OnInit {

  constructor(
    private auth: Auth,
    // service
    protected userService: UserService,
    private pictureService: PictureService,
    private favoriteService: FavoriteService,

    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  async ngOnInit(): Promise<any> {
    this.getUserPicture();
  }

  public userPicture: any;
  protected matchUser: boolean;

  // 一つ前の画面に戻る
  protected goBack() {
    this.location.back();
  }

  getUserPicture() {
    // ↓の式には+をつけない
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getCurrentUser();
    return this.pictureService.getUserPicture(id)
      .subscribe((response) => {
        // responseには取得した画像データ
        this.userPicture = response;
        // 画像データのuidとアクセスしたユーザーのuidが同じなら削除ボタンを表示する
        onAuthStateChanged(this.auth, (user) => {
          if(user) {
            if(this.userPicture.uid === user.uid) {
              this.matchUser = true;
              console.log('pictureUid = currentUid');
            } else {
              this.matchUser = false;
              console.log('pictureUid != currentUser');
            }
          } else {
            this.matchUser = false;
            console.log('pictureUid != currentUser');
          }
        })
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

  changeFavorite() {
    const pictureId: any = [];
    pictureId.push(this.userPicture.id);
    this.favoriteService.changeFavorite(pictureId)
      .subscribe((response) => {
        console.log(response);
        this.goBack();
      });
  }

}
