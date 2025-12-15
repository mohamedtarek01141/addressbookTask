import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../../models/address-book.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/login', credentials).pipe(
      tap((response: AuthResponse) => {
        const user: User = {
          username: response.userName,
          email: response.email,
          token: response.token
        };
        this.setUser(user);
      })
    );
  }

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('auth/register', registerData).pipe(
      tap((response: AuthResponse) => {
        const user: User = {
          username: response.userName,
          email: response.email,
          token: response.token
        };
        this.setUser(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setUser(user: User): void {
    if (user.token) {
      localStorage.setItem(this.TOKEN_KEY, user.token);
    }
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (e) {
        this.logout();
      }
    }
  }
}
