/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {createExclude, CreateExclude$Params} from '../fn/exclude/create-exclude';
import {ExcludeResponse} from '../models/exclude-response';
import {getAllExcludes, GetAllExcludes$Params} from '../fn/exclude/get-all-excludes';
import {getExcludeById, GetExcludeById$Params} from '../fn/exclude/get-exclude-by-id';


/**
 * exclude
 */
@Injectable({providedIn: 'root'})
export class ExcludeService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `getAllExcludes()` */
    static readonly GetAllExcludesPath = '/exclude';

    /**
     * Get all excludes.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getAllExcludes()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllExcludes$Response(params?: GetAllExcludes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExcludeResponse>>> {
        return getAllExcludes(this.http, this.rootUrl, params, context);
    }

    /**
     * Get all excludes.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getAllExcludes$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllExcludes(params?: GetAllExcludes$Params, context?: HttpContext): Observable<Array<ExcludeResponse>> {
        return this.getAllExcludes$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<ExcludeResponse>>): Array<ExcludeResponse> => r.body)
        );
    }

    /** Path part for operation `createExclude()` */
    static readonly CreateExcludePath = '/exclude';

    /**
     * Create a new exclude.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `createExclude()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createExclude$Response(params: CreateExclude$Params, context?: HttpContext): Observable<StrictHttpResponse<ExcludeResponse>> {
        return createExclude(this.http, this.rootUrl, params, context);
    }

    /**
     * Create a new exclude.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `createExclude$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createExclude(params: CreateExclude$Params, context?: HttpContext): Observable<ExcludeResponse> {
        return this.createExclude$Response(params, context).pipe(
            map((r: StrictHttpResponse<ExcludeResponse>): ExcludeResponse => r.body)
        );
    }

    /** Path part for operation `getExcludeById()` */
    static readonly GetExcludeByIdPath = '/exclude/{id}';

    /**
     * Get exclude by id.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getExcludeById()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExcludeById$Response(params: GetExcludeById$Params, context?: HttpContext): Observable<StrictHttpResponse<ExcludeResponse>> {
        return getExcludeById(this.http, this.rootUrl, params, context);
    }

    /**
     * Get exclude by id.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getExcludeById$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getExcludeById(params: GetExcludeById$Params, context?: HttpContext): Observable<ExcludeResponse> {
        return this.getExcludeById$Response(params, context).pipe(
            map((r: StrictHttpResponse<ExcludeResponse>): ExcludeResponse => r.body)
        );
    }

}
