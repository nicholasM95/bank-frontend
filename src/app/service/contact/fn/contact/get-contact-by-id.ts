/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {ContactResponse} from '../../models/contact-response';

export interface GetContactById$Params {

    /**
     * contact id
     */
    id: string;
}

export function getContactById(http: HttpClient, rootUrl: string, params: GetContactById$Params, context?: HttpContext): Observable<StrictHttpResponse<ContactResponse>> {
    const rb = new RequestBuilder(rootUrl, getContactById.PATH, 'get');
    if (params) {
        rb.path('id', params.id, {});
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<ContactResponse>;
        })
    );
}

getContactById.PATH = '/contact/{id}';
