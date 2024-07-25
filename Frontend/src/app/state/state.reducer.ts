import { Action, createReducer, on } from '@ngrx/store';
import { login, logout } from './state.action';

export interface AuthState {
  token: string | null;
}

export const initialState: AuthState = {
  token: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { token }) => ({ ...state, token })),
  on(logout, () => ({ ...initialState }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
