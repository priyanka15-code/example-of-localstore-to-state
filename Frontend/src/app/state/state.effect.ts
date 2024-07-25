import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { login, logout } from './state.action';

@Injectable()
export class AuthEffects {
 /*  saveToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(action => {
          localStorage.setItem('authToken', action.token);
        })
      ),
    { dispatch: false }
  );

  clearToken$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('authToken');
        })
      ),
    { dispatch: false }
  );
*/
  constructor(private actions$: Actions) {}
}
