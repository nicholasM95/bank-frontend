import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  authCodeFlowConfig: AuthConfig = {
    issuer: 'https://keycloak.nicholasmeyers.be/realms/bank',
    redirectUri: window.location.origin,
    clientId: 'bank-frontend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    strictDiscoveryDocumentValidation: true,
    disableAtHashCheck: false,
    disablePKCE: false,
  };

  isDarkMode = false;
  showContent = false;

  constructor(private router: Router, private oauthService: OAuthService) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode = true;
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      this.isDarkMode = event.matches;
    });
    this.oauthService.configure(this.authCodeFlowConfig);
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
        this.navigate();
      } else {
        this.showContent = true;
      }
    });
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  private navigate() {
    this.router.navigateByUrl('overview').then(r => {
      if (!r) {
        console.error('failed to navigate to overview from home');
      }
    });
  }

}
