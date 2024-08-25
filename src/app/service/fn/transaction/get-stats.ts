/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TransactionStatsResponse } from '../../models/transaction-stats-response';

export interface GetStats$Params {

/**
 * ISO 8601 format date
 */
  month: string;
}

export function getStats(http: HttpClient, rootUrl: string, params: GetStats$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionStatsResponse>> {
  const rb = new RequestBuilder(rootUrl, getStats.PATH, 'get');
  if (params) {
    rb.path('month', params.month, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<TransactionStatsResponse>;
    })
  );
}

getStats.PATH = '/transaction/stats/{month}';
