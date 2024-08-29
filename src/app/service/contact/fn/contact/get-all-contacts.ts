/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {ContactResponse} from '../../models/contact-response';

export interface GetAllContacts$Params {
}

export function getAllContacts(http: HttpClient, rootUrl: string, params?: GetAllContacts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ContactResponse>>> {
    const rb = new RequestBuilder(rootUrl, getAllContacts.PATH, 'get');
    if (params) {
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<Array<ContactResponse>>;
        })
    );
}

getAllContacts.PATH = '/contact';
