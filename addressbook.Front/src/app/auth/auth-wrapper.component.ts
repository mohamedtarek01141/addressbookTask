import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-wrapper',
  template: `
    <app-login *ngIf="showLogin"></app-login>
    <app-register *ngIf="showRegister"></app-register>
  `,
  standalone: false
})
export class AuthWrapperComponent implements OnInit {
  showLogin = false;
  showRegister = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const url = this.router.url;
    if (url.includes('/register')) {
      this.showRegister = true;
    } else {
      this.showLogin = true;
    }
  }
}

