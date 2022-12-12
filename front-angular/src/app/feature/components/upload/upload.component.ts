import { Component, OnInit } from '@angular/core';
import { PictureService } from '../../service/picture.service';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private pictureService: PictureService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  private reader =  new FileReader();

  private file: any;

  protected imageUrl: any;
  protected image: any;

  previewImage(photo: any) {

    // html側でphotoのみなら→photo.target.files[0]
    this.file = photo[0];
    this.reader.readAsDataURL(this.file);
    this.reader.onload = ((e: any) => {
      this.imageUrl = e.target['result'];
    });
  }

  store() {
    this.pictureService.storeImage(this.file)
      .subscribe({
        error: (error) => console.log(error),
        complete: () => console.log('success Upload!')
    });
  }


}
