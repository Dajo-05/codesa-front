export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tokenType: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface UsuarioSesion {
  token: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}
