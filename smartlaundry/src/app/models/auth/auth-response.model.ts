import { User } from './user.model';

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginResponse extends AuthResponse {}
export interface RegisterResponse extends AuthResponse {}
