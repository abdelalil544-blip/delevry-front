import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Role } from './auth.model';

export const roleGuard = (roles: Role[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);

    const userRole = auth.role();
    if (!userRole) {
      return false;
    }

    return roles.includes(userRole);
  };
};
