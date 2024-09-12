/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {CreateTagRequest} from '../../models/create-tag-request';
import {TagResponse} from '../../models/tag-response';

export interface CreateTag$Params {
    body: CreateTagRequest
}

export function createTag(http: HttpClient, rootUrl: string, params: CreateTag$Params, context?: HttpContext): Observable<StrictHttpResponse<TagResponse>> {
    const rb = new RequestBuilder(rootUrl, createTag.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<TagResponse>;
        })
    );
}

createTag.PATH = '/tag';
