import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  email: string = '';
  showLogin: boolean = true;
  isLoggedIn$: Observable<boolean>;

  constructor(private api: LoginService, private router: Router) {
    this.isLoggedIn$ = this.api.isAuthenticated();
  }

  ngOnInit(): void {}

  login(): void {
    this.api.login(this.username, this.password).subscribe({
      next: () => {
        console.log('Login successful');
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }

  /* isLoggedIn(): boolean {
    return this.api.isAuthenticated();
  } */

  logout(): void {
    this.api.logout();
    this.router.navigate(['/login']);
  }

  register(): void {
    this.api.register(this.username, this.password, this.email).subscribe({
      next: (response) => {
        console.log(response.message);
        this.login();
      },
      error: (err) => {
        console.error('Registration error:', err);
      },
    });
  }
}
