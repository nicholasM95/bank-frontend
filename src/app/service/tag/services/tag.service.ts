/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {createTag, CreateTag$Params} from '../fn/tag/create-tag';
import {getAllTags, GetAllTags$Params} from '../fn/tag/get-all-tags';
import {getTagById, GetTagById$Params} from '../fn/tag/get-tag-by-id';
import {TagResponse} from '../models/tag-response';


/**
 * tag
 */
@Injectable({providedIn: 'root'})
export class TagService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `getAllTags()` */
    static readonly GetAllTagsPath = '/tag';

    /**
     * Get all tags.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getAllTags()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllTags$Response(params?: GetAllTags$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TagResponse>>> {
        return getAllTags(this.http, this.rootUrl, params, context);
    }

    /**
     * Get all tags.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getAllTags$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllTags(params?: GetAllTags$Params, context?: HttpContext): Observable<Array<TagResponse>> {
        return this.getAllTags$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<TagResponse>>): Array<TagResponse> => r.body)
        );
    }

    /** Path part for operation `createTag()` */
    static readonly CreateTagPath = '/tag';

    /**
     * Create a new tag.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `createTag()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createTag$Response(params: CreateTag$Params, context?: HttpContext): Observable<StrictHttpResponse<TagResponse>> {
        return createTag(this.http, this.rootUrl, params, context);
    }

    /**
     * Create a new tag.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `createTag$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createTag(params: CreateTag$Params, context?: HttpContext): Observable<TagResponse> {
        return this.createTag$Response(params, context).pipe(
            map((r: StrictHttpResponse<TagResponse>): TagResponse => r.body)
        );
    }

    /** Path part for operation `getTagById()` */
    static readonly GetTagByIdPath = '/tag/{id}';

    /**
     * Get tag by id.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getTagById()` instead.
     *
     * This method doesn't expect any request body.
     */
    getTagById$Response(params: GetTagById$Params, context?: HttpContext): Observable<StrictHttpResponse<TagResponse>> {
        return getTagById(this.http, this.rootUrl, params, context);
    }

    /**
     * Get tag by id.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getTagById$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getTagById(params: GetTagById$Params, context?: HttpContext): Observable<TagResponse> {
        return this.getTagById$Response(params, context).pipe(
            map((r: StrictHttpResponse<TagResponse>): TagResponse => r.body)
        );
    }

}
