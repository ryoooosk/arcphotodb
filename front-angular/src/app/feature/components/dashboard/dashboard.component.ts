import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { UserService } from '../../../shared/service/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
