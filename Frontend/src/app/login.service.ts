import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState} from './state/app.state';
import { login,logout } from './state/state.action';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public apiUrl = 'http://localhost:3000/api/auth';
 /*  private localStorageKey = 'authToken'; */

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        this.store.dispatch(login({ token: response.token }));
        this.store.select(state => state.auth.token).subscribe(token => {
          console.log('After Login State:', token);
        });
      })
    );
  }



  register(username: string, password: string, email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, { username, password, email });
  }


  logout(): void {
   /*  localStorage.removeItem(this.localStorageKey); */
   this.store.select(state => state.auth.token)
  }

  getToken(): Observable<string | null> {
   /*  return localStorage.getItem(this.localStorageKey); */
   return this.store.select(state => state.auth.token);
  }

  isAuthenticated(): Observable<boolean> {
    /* const token = this.getToken();
    return !!token; */
    return this.store.select(state => !!state.auth.token)
  }
}
