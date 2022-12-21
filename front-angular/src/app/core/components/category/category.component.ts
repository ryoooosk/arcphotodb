import { Component, OnInit } from '@angular/core';
import { TagService } from '../../service/tag.service';
import { tap } from 'rxjs';
import { LoginComponent } from '../../../users/components/login/login.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  protected placeHide: boolean = true;
  protected placeTags = {
    chiyoda: { 'id': 1, selected: false },
    minato: { 'id': 2, selected: false },
    shinjuku: { 'id': 3, selected: false },
    shibuya: { 'id': 4, selected: false }
  }

  constructor(
    private tagService: TagService
  ) {}

  ngOnInit(): void {
  }

  openClose() {
    if(this.placeHide === true) {
      this.placeHide = false;
    } else {
      this.placeHide = true;
    }
  }

  getPicture() {
    // ↓初期化
    this.tagService.tagPictures = null;
    this.tagService.tagPicturesSrc = [];

    const result = [];
    for (let [key, value] of Object.entries(this.placeTags)) {
      if(value.selected === true) {
        result.push(value.id);
      }
    }
    if(result.length) {
      console.log(result);
    }

    this.tagService.getPictures(result)
      .pipe(
        tap((response) => {
          if(response) {
            this.tagService.tagPictures = response;
            console.log(this.tagService.tagPictures);
            for(let i = 0; i < this.tagService.tagPictures.length; i+=1) {
              this.tagService.tagPicturesSrc.push(this.tagService.tagPictures[i].path);
            }
          }
        }),
      )
      .subscribe({
        error: (error) => console.log(error),
        complete: () => {
          console.log('Get tagPictures!');
        }
      });
  }

}
