import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginRequest, User } from '../../models/address-book.model';

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

  login(credentials: LoginRequest): Observable<any> {
    return new Observable(observer => {
      // Mock login - replace with actual API call
      // For now, accept any username/password
      const mockUser: User = {
        id: 1,
        username: credentials.username,
        token: 'mock_token_' + Date.now()
      };

      this.setUser(mockUser);
      observer.next(mockUser);
      observer.complete();

      // Uncomment for real API:
      // this.apiService.post<User>('auth/login', credentials).subscribe({
      //   next: (user) => {
      //     this.setUser(user);
      //     observer.next(user);
      //     observer.complete();
      //   },
      //   error: (err) => observer.error(err)
      // });
    });
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

