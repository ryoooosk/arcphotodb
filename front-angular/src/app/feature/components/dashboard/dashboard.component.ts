import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../core/service/tag.service';

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

}
