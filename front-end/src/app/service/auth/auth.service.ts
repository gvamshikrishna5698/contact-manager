import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private zone: NgZone
  ) {}

  authenticateUser(username: string, password: string) {
    return this.httpClient.post<any>(`${API_URL}/contacts/login`, {
      username: username,
      password: password,
    });
  }

  register(userData: NgForm) {
    return this.httpClient.post<any>(
      `${API_URL}/contacts/register`,
      userData.form.value
    );
  }

  authenticate(id: string) {
    return this.httpClient.post(
      `${API_URL}/contacts/authenticate`,
      { id: id },
      { responseType: 'text' }
    );
  }

  logout() {
    return this.httpClient.delete(`${API_URL}/contacts/logout`);
  }

  verifyUser() {
    const promise = new Promise<Boolean>((resolve, reject) => {
      const uid = sessionStorage.getItem('id');
      this.httpClient
        .post(
          `${API_URL}/contacts/authenticate`,
          { id: uid },
          { responseType: 'text' }
        )
        .toPromise()
        .then(
          (_res: any) => {
            resolve(true);
          },

          (_err) => {
            this.zone.run(() => this.router.navigate(['/error']));
            reject();
          }
        );
    });
    this.isUserLoggedIn();
    return promise;
  }

  verifyRoles(roles: any) {
    const promise = new Promise<Boolean>((resolve, reject) => {
      this.httpClient
        .post(
          `${API_URL}/contacts/role`,
          { role: roles },
          { responseType: 'text' }
        )
        .toPromise()
        .then(
          (_res: any) => {
            resolve(true);
          },

          (_err) => {
            reject(false);
          }
        );
    });
    this.isUserLoggedIn();
    return promise;
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem('id') != null) {
      return true;
    } else {
      return false;
    }
  }
}
