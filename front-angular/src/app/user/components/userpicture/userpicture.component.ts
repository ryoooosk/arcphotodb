import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../../../feature/service/picture.service';

@Component({
  selector: 'app-userpicture',
  templateUrl: './userpicture.component.html',
  styleUrls: ['./userpicture.component.css']
})
export class UserpictureComponent implements OnInit {

  constructor(
    private pictureService: PictureService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserPicture();
  }

  public userPicture: any;

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
