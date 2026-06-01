import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService, LoginResponse } from './api.service';

const AUTH_KEY = 'real_estate_logged_in';
const USER_KEY = 'real_estate_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  isLoggedIn(): boolean {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  getUser(): LoginResponse['user'] | null {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  loginWithApi(email: string, password: string): Observable<LoginResponse> {
    return this.api.login(email, password).pipe(
      tap((response) => {
        sessionStorage.setItem(AUTH_KEY, 'true');
        sessionStorage.setItem(USER_KEY, JSON.stringify(response.user));
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
}
