/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {TagResponse} from '../../models/tag-response';

export interface GetTagById$Params {

    /**
     * tag id
     */
    id: string;
}

export function getTagById(http: HttpClient, rootUrl: string, params: GetTagById$Params, context?: HttpContext): Observable<StrictHttpResponse<TagResponse>> {
    const rb = new RequestBuilder(rootUrl, getTagById.PATH, 'get');
    if (params) {
        rb.path('id', params.id, {});
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

getTagById.PATH = '/tag/{id}';
