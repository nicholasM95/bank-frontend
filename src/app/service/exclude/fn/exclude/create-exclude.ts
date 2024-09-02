/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {CreateExcludeRequest} from '../../models/create-exclude-request';
import {ExcludeResponse} from '../../models/exclude-response';

export interface CreateExclude$Params {
    body: CreateExcludeRequest
}

export function createExclude(http: HttpClient, rootUrl: string, params: CreateExclude$Params, context?: HttpContext): Observable<StrictHttpResponse<ExcludeResponse>> {
    const rb = new RequestBuilder(rootUrl, createExclude.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<ExcludeResponse>;
        })
    );
}

createExclude.PATH = '/exclude';
