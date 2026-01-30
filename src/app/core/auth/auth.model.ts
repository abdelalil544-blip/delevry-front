export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  password: string;
  role: Role;
  // Optional fields for Livreur
  vehicule?: string;
  zoneAssigneeId?: string;
}

export interface RegisterResponse {
  message: string;
}

export type Role = 'ADMIN' | 'LIVREUR' | 'CLIENT' | 'DESTINATAIRE';

export interface JwtPayload {
  sub: string;
  role: Role;
  exp: number;
}
