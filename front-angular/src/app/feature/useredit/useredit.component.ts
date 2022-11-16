import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
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

  private sendInfo: {
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
  }

  previewPhoto(photo: any) {
    this.userService.previewUserPhoto(photo);
  }

  updateUser(form: NgForm) {
    this.sendInfo = form.value;
    console.log(this.sendInfo);
    this.userService.updateUserInfo(this.sendInfo);
  }


}
