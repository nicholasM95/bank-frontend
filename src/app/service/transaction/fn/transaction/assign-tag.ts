/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {StrictHttpResponse} from '../../strict-http-response';
import {RequestBuilder} from '../../request-builder';

import {TagAssignTransactionRequest} from '../../models/tag-assign-transaction-request';
import {TransactionDetailStatsResponse} from '../../models/transaction-detail-stats-response';

export interface AssignTag$Params {
    body: TagAssignTransactionRequest
}

export function assignTag(http: HttpClient, rootUrl: string, params: AssignTag$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionDetailStatsResponse>> {
    const rb = new RequestBuilder(rootUrl, assignTag.PATH, 'post');
    if (params) {
        rb.body(params.body, 'application/json');
    }

    return http.request(
        rb.build({responseType: 'json', accept: 'application/json', context})
    ).pipe(
        filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
            return r as StrictHttpResponse<TransactionDetailStatsResponse>;
        })
    );
}

assignTag.PATH = '/transaction/tag';
