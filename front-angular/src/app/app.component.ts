import { Component } from '@angular/core';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-angular';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser();
  }
}
