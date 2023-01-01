import { Component, OnInit } from '@angular/core';
import { TagService } from '../../service/tag.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    protected tagService: TagService
  ) { }

  ngOnInit(): void {
  }

  protected placeHide: boolean = true;
  protected placeTags = {
    chiyoda: { 'id': 1, selected: false },
    minato: { 'id': 2, selected: false },
    shinjuku: { 'id': 3, selected: false },
    shibuya: { 'id': 4, selected: false }
  }

  openClose() {
    if(this.placeHide === true) {
      this.placeHide = false;
    } else { this.placeHide = true; }
  }

  getPicture() {
    const result = this.loop(this.placeTags);
    this.tagService.getPictures(result)
      .subscribe((response) => {
        // 初期化
        this.tagService.tagPictures = null;
        this.tagService.tagPicturesSrc = [];

        if(response) {
          this.tagService.tagPictures = response;
          console.log(this.tagService.tagPictures);
          for(let i = 0; i < this.tagService.tagPictures.length; i+=1) {
            this.tagService.tagPicturesSrc.push(this.tagService.tagPictures[i].path);
          }
        }
      });
  }

  loop(tag: object): any[] {
    const result: any[] = [];
    for (let [key, value] of Object.entries(tag)) {
      if(value.selected === true) { result.push(value.id); }
    }
    if(result.length) { console.log(result); }
    else { console.log("No Tags"); }

    return result;
  }

}
