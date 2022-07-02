import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout() {
    sessionStorage.removeItem('id');
    this.authService.logout().subscribe(
      (res) => {
        console.log('item' + sessionStorage.getItem('id'));
        sessionStorage.removeItem('id');
        this.router.navigate(['/login']);
      },
      (err) => {
        sessionStorage.removeItem('id');
        this.router.navigate(['/login']);
      }
    );
  }
}
