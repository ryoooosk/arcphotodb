import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Service
import { PictureService } from '../../service/picture.service';
import { UserService } from '../../../shared/service/user.service';
import { FavoriteService } from '../../service/favorite.service';
// Firebase
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

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

  async getUserPicture() {
    // ↓の式には+をつけない
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    return this.pictureService.getUserPicture(id)
      .subscribe((response) => {
        // responseには取得した画像データ
        this.userPicture = response;
        // 画像データのuidとアクセスしたユーザーのuidが同じなら削除ボタンを表示する
        // onAuthStateChangedで取得したデータをどこかに保持しておいて、一々呼び出さないようにしたい
        // ただ、onAuthStateChangedでuser情報を保持する前に後の処理が走ってしまう。
        onAuthStateChanged(this.auth, (user) => {
          this.matchPictureUser(user);
        })
      });
  }

  matchPictureUser(user: any) {
    // 引数はcurrentUserを想定
    if(user) {
      // ngOnInitにて、表示されているpicture情報はuserPictureプロパティに格納されている
      if(this.userPicture.uid === user.uid) {
        this.matchUser = true;
        console.log('pictureUid = currentUid');
      } else {
        this.matchUser = false;
        console.log('pictureUid != currentUser');
      }
    } else {
      this.matchUser = false;
      console.log('Not Found CurrentUser');
    }

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
