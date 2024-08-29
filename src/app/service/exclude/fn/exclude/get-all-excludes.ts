/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {ExcludeResponse} from '../../models/exclude-response';

export interface GetAllExcludes$Params {
}

export function getAllExcludes(http: HttpClient, rootUrl: string, params?: GetAllExcludes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ExcludeResponse>>> {
    const rb = new RequestBuilder(rootUrl, getAllExcludes.PATH, 'get');
    if (params) {
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<Array<ExcludeResponse>>;
        })
    );
}

getAllExcludes.PATH = '/exclude';
