import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isUserLoggedin: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    console.log('RESULT' + this.authService.isAdminUser());
  }
}
