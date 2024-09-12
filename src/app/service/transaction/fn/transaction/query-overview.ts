/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {TransactionQueryOverviewRequest} from '../../models/transaction-query-overview-request';
import {TransactionQueryOverviewResponse} from '../../models/transaction-query-overview-response';

export interface QueryOverview$Params {
    body: TransactionQueryOverviewRequest
}

export function queryOverview(http: HttpClient, rootUrl: string, params: QueryOverview$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionQueryOverviewResponse>> {
    const rb = new RequestBuilder(rootUrl, queryOverview.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<TransactionQueryOverviewResponse>;
        })
    );
}

queryOverview.PATH = '/transaction/overview';
