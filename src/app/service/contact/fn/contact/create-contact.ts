/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {ContactResponse} from '../../models/contact-response';
import {CreateContactRequest} from '../../models/create-contact-request';

export interface CreateContact$Params {
    body: CreateContactRequest
}

export function createContact(http: HttpClient, rootUrl: string, params: CreateContact$Params, context?: HttpContext): Observable<StrictHttpResponse<ContactResponse>> {
    const rb = new RequestBuilder(rootUrl, createContact.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
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

createContact.PATH = '/contact';
