export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export type Role = 'ADMIN' | 'LIVREUR' | 'CLIENT' | 'DESTINATAIRE';

export interface JwtPayload {
  sub: string;        
  role: Role;         
  exp: number;
}
