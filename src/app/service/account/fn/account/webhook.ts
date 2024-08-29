/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';


export interface Webhook$Params {

    /**
     * reference
     */
    ref: string;
}

export function webhook(http: HttpClient, rootUrl: string, params: Webhook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(rootUrl, webhook.PATH, 'get');
    if (params) {
        rb.query('ref', params.ref, {});
    }

    return http.request(
        rb.build({responseType: 'text', accept: '*/*', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return (r as HttpResponse<any>).clone({body: undefined}) as StrictHttpResponse<void>;
        })
    );
}

webhook.PATH = '/account/webhook';
