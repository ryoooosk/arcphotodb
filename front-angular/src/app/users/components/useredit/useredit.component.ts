import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  constructor(
    protected userService: UserService
  ) { }

  protected userInfo: {
    displayName: string,
    userText: string | null | undefined,
    twitterUrl: string | null | undefined,
    instagramUrl: string | null | undefined
  } = {
    displayName: "",
    userText: "",
    twitterUrl: "",
    instagramUrl: ""
  }

  ngOnInit(): void {
    this.userInfo = this.userService.userInfo;
  }

  previewPhoto(photo: any) {
    this.userService.previewUserPhoto(photo);
  }

  updateUser(form: NgForm) {
    console.log(this.userInfo);
    this.userService.updateUserInfo(this.userInfo);
  }


}
