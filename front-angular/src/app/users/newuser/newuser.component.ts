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

  protected userInfo: {
    displayName: string,
    userText: string | null
  } = {
    displayName: '',
    userText: ''
  };

  reader =  new FileReader();

  ngOnInit(): void {
  }

  // NgFormを使うと、Blobで送れなくなってしまう←要検討

  registerUser(form: NgForm) {
    this.userInfo = form.value;
    this.userService.registerUserInfo(this.userInfo);
    this.router.navigateByUrl('/');
  }

  previewPhoto(photo: any) {
    this.userService.previewUserPhoto(photo);
  }

}
