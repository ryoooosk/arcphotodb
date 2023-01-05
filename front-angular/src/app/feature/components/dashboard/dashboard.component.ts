import { Component, OnInit } from '@angular/core';
import { TagService } from '../../service/tag.service';


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
    this.getAllPicture();
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

  getAllPicture() {
    this.tagService.getAllPictures()
      .subscribe((response) => {
        this.tagService.tagPictures = response;
        console.log(this.tagService.tagPictures);
      });
  }

  getPicture() {
    const result = this.loop(this.placeTags);
    this.tagService.getPictures(result)
      .subscribe((response) => {
        this.tagService.tagPictures = response;
        console.log(this.tagService.tagPictures);
      });
  }

  loop(tag: object): any[] {
    const result: any[] = [];
    // Object.value()メソッドでオブジェクトの値だけの配列となる→for of文でループ
    for (let value of Object.values(tag)) {
      if(value.selected === true) { result.push(value.id); }
    }
    if(result.length) { console.log(result); }
    else { console.log("No Tags"); }

    return result;
  }

}
