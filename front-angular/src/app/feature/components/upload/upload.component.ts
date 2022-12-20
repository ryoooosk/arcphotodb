import { Component, OnInit } from '@angular/core';
import { PictureService } from '../../service/picture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private pictureService: PictureService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  private reader =  new FileReader();
  private file: any;

  protected imageUrl: any;
  protected image: any;

  // ↓送るタグのidだけの配列にして送信したい
  protected tags = {
    1: { 'name': 'chiyoda', selected: false },
    2: { 'name': 'minato', selected: false },
    3: { 'name': 'shinjuku', selected: false },
    4: { 'name': 'shibuya', selected: false },
  }

  previewImage(photo: any) {
    // html側でphotoのみなら→photo.target.files[0]
    this.file = photo[0];
    this.reader.readAsDataURL(this.file);
    this.reader.onload = ((e: any) => {
      this.imageUrl = e.target['result'];
    });
  }

  store() {
    // tags連想配列をループで回して、値だけの配列にしたい
    const result = [];
    // Object.entries→オブジェクトを[key, value](key: value)の形に抽出する
    for (let [key, value] of Object.entries(this.tags)) {
      if(value.selected === true) {
        result.push(key);
      }
    }
    this.pictureService.storeImage(this.file, result)
      .subscribe({
        error: (error) => console.log(error),
        complete: () => {
          console.log('success Upload!'),
          this.router.navigateByUrl('/');
        }
    });
  }


}
