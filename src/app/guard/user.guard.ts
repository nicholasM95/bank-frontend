import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

export const userGuard: CanActivateFn = (route, state) => {

  const accessOk = inject(OAuthService).hasValidAccessToken() && inject(OAuthService).hasValidAccessToken();
  if (accessOk) {
    return true;
  } else {
    const router = inject(Router);
    router.navigateByUrl('home').then(r => {
      if (!r) {
        console.error('failed to navigate to home from guard');
      }
    });
    return false;
  }
};
