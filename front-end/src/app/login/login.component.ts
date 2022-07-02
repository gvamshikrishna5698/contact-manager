import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  handleLogin() {
    this.invalidLogin = false;
    this.authService.authenticateUser(this.username, this.password).subscribe(
      (data) => {
        sessionStorage.setItem('id', data.id);
        this.router.navigate(['/welcome']);
      },
      (err) => {
        this.invalidLogin = true;
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
