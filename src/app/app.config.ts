import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {provideOAuthClient} from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(),
        provideOAuthClient({resourceServer: {sendAccessToken: true, allowedUrls: ['http://localhost:8080/transaction/overview']}}),
    ]
};
