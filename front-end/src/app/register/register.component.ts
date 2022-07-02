import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  errorMessage = '';
  error = false;

  register(registerForm: NgForm) {
    this.error = false;
    this.authService.register(registerForm).subscribe(
      (data) => {
        sessionStorage.setItem('authenticateUser', JSON.stringify(data));
        console.log(data);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errorMessage = err.error;
        this.error = true;
      }
    );
  }
}
