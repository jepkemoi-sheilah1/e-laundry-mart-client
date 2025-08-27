import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

import { LoginRequest } from '../../models/auth/login-request.model';
import { RegisterRequest } from '../../models/auth/register-request.model';
import { AuthResponse, LoginResponse, RegisterResponse } from '../../models/auth/auth-response.model';
import { User } from '../../models/auth/user.model';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';
import { APP_CONSTANTS } from '../../core/constants/app-constants';
import { DEFAULT_ROUTES } from '../../core/constants/user-roles';
import { JwtService } from './jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {
    this.initializeUser();
  }

  private initializeUser(): void {
    const token = this.jwtService.getToken();
    if (token && !this.jwtService.isTokenExpired(token)) {
      const userData = localStorage.getItem(APP_CONSTANTS.USER_KEY);
      if (userData) {
        this.currentUserSubject.next(JSON.parse(userData));
      }
    }
  }

  register(registerData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, registerData)
      .pipe(
        tap(response => {
          if (response.user && response.token) {
            this.setAuthData(response);
          }
        })
      );
  }

  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, loginData)
      .pipe(
        tap(response => {
          if (response.user && response.token) {
            this.setAuthData(response);
            this.redirectToUserDashboard(response.user);
          }
        })
      );
  }

  logout(): void {
    this.jwtService.removeTokens();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.jwtService.getToken();
    return token !== null && !this.jwtService.isTokenExpired(token);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setAuthData(authData: AuthResponse): void {
    this.jwtService.setToken(authData.token);
    this.jwtService.setRefreshToken(authData.refreshToken);
    localStorage.setItem(APP_CONSTANTS.USER_KEY, JSON.stringify(authData.user));
    this.currentUserSubject.next(authData.user);
  }

  private redirectToUserDashboard(user: User): void {
    const defaultRoute = DEFAULT_ROUTES[user.role];
    this.router.navigate([defaultRoute]);
  }
}
