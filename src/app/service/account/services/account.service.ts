/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {AccountResponse} from '../models/account-response';
import {createAccount, CreateAccount$Params} from '../fn/account/create-account';
import {getAllAccounts, GetAllAccounts$Params} from '../fn/account/get-all-accounts';
import {loginToAccount, LoginToAccount$Params} from '../fn/account/login-to-account';
import {sync, Sync$Params} from '../fn/account/sync';
import {webhook, Webhook$Params} from '../fn/account/webhook';


/**
 * account
 */
@Injectable({providedIn: 'root'})
export class AccountService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `getAllAccounts()` */
    static readonly GetAllAccountsPath = '/account';

    /**
     * Get all accounts.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getAllAccounts()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllAccounts$Response(params?: GetAllAccounts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AccountResponse>>> {
        return getAllAccounts(this.http, this.rootUrl, params, context);
    }

    /**
     * Get all accounts.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getAllAccounts$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllAccounts(params?: GetAllAccounts$Params, context?: HttpContext): Observable<Array<AccountResponse>> {
        return this.getAllAccounts$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<AccountResponse>>): Array<AccountResponse> => r.body)
        );
    }

    /** Path part for operation `createAccount()` */
    static readonly CreateAccountPath = '/account';

    /**
     * Create a new bank account.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `createAccount()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createAccount$Response(params: CreateAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
        return createAccount(this.http, this.rootUrl, params, context);
    }

    /**
     * Create a new bank account.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `createAccount$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createAccount(params: CreateAccount$Params, context?: HttpContext): Observable<void> {
        return this.createAccount$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body)
        );
    }

    /** Path part for operation `loginToAccount()` */
    static readonly LoginToAccountPath = '/account/{id}';

    /**
     * Login to account by id.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `loginToAccount()` instead.
     *
     * This method doesn't expect any request body.
     */
    loginToAccount$Response(params: LoginToAccount$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
        return loginToAccount(this.http, this.rootUrl, params, context);
    }

    /**
     * Login to account by id.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `loginToAccount$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    loginToAccount(params: LoginToAccount$Params, context?: HttpContext): Observable<void> {
        return this.loginToAccount$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body)
        );
    }

    /** Path part for operation `webhook()` */
    static readonly WebhookPath = '/account/webhook';

    /**
     * Webhook.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `webhook()` instead.
     *
     * This method doesn't expect any request body.
     */
    webhook$Response(params: Webhook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
        return webhook(this.http, this.rootUrl, params, context);
    }

    /**
     * Webhook.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `webhook$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    webhook(params: Webhook$Params, context?: HttpContext): Observable<void> {
        return this.webhook$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body)
        );
    }

    /** Path part for operation `sync()` */
    static readonly SyncPath = '/account/sync';

    /**
     * Sync.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `sync()` instead.
     *
     * This method doesn't expect any request body.
     */
    sync$Response(params?: Sync$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
        return sync(this.http, this.rootUrl, params, context);
    }

    /**
     * Sync.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `sync$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    sync(params?: Sync$Params, context?: HttpContext): Observable<void> {
        return this.sync$Response(params, context).pipe(
            map((r: StrictHttpResponse<void>): void => r.body)
        );
    }

}
