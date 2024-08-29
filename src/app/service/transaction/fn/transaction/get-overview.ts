/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {TransactionOverviewResponse} from '../../models/transaction-overview-response';

export interface GetOverview$Params {
}

export function getOverview(http: HttpClient, rootUrl: string, params?: GetOverview$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionOverviewResponse>> {
    const rb = new RequestBuilder(rootUrl, getOverview.PATH, 'get');
    if (params) {
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<TransactionOverviewResponse>;
        })
    );
}

getOverview.PATH = '/transaction/overview';
