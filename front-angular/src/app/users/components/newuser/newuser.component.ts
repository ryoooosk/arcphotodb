import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  constructor(
    protected userService: UserService
  ) { }

  protected sendInfo: {
    displayName: string,
  } = {
    displayName: '',
  };

  reader =  new FileReader();

  ngOnInit(): void {
  }

  // NgFormを使うと、Blobで送れなくなってしまう
  registerUser(form: NgForm) {
    this.sendInfo = form.value;
    this.userService.registerUserInfo(this.sendInfo);
  }

  previewPhoto(photo: any) {
    this.userService.previewUserPhoto(photo);
  }

}
