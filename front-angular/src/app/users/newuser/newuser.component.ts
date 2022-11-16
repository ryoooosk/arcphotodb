import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  constructor(
    private router: Router,
    protected userService: UserService
  ) { }

  private sendInfo: {
    displayName: string,
    userText: string | null
  } = {
    displayName: '',
    userText: ''
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
