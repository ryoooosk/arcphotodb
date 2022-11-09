import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  constructor(
    protected userService: UserService
  ) { }

  ngOnInit(): void {
  }

  previewPhoto(photo: any) {
    this.userService.previewUserPhoto(photo);
  }


}
