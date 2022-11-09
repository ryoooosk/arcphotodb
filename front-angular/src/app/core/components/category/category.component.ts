import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  protected styleHide: boolean;
  protected historyHide: boolean;
  protected placeHide: boolean;

  constructor() {
     this.styleHide = true;
     this.historyHide = true;
     this.placeHide = true;
  }

  ngOnInit(): void {
  }

  openStyle() {
    if(this.styleHide === true) {
      this.styleHide = false;
    } else {
      this.styleHide = true;
    }
  }

  openHistory() {
    if(this.historyHide === true) {
      this.historyHide = false;
    } else {
      this.historyHide = true;
    }
  }

  openPlace() {
    if(this.placeHide === true) {
      this.placeHide = false;
    } else {
      this.placeHide = true;
    }
  }

}
