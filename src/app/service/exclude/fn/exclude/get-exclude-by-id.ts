/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {ExcludeResponse} from '../../models/exclude-response';

export interface GetExcludeById$Params {

    /**
     * exclude id
     */
    id: string;
}

export function getExcludeById(http: HttpClient, rootUrl: string, params: GetExcludeById$Params, context?: HttpContext): Observable<StrictHttpResponse<ExcludeResponse>> {
    const rb = new RequestBuilder(rootUrl, getExcludeById.PATH, 'get');
    if (params) {
        rb.path('id', params.id, {});
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

getExcludeById.PATH = '/exclude/{id}';
