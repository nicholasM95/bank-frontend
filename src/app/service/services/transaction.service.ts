/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { getOverview } from '../fn/transaction/get-overview';
import { GetOverview$Params } from '../fn/transaction/get-overview';
import { getStats } from '../fn/transaction/get-stats';
import { GetStats$Params } from '../fn/transaction/get-stats';
import { TransactionOverviewResponse } from '../models/transaction-overview-response';
import { TransactionStatsResponse } from '../models/transaction-stats-response';


/**
 * transaction
 */
@Injectable({ providedIn: 'root' })
export class TransactionService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getOverview()` */
  static readonly GetOverviewPath = '/transaction/overview';

  /**
   * get overview of the last months.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOverview()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOverview$Response(params?: GetOverview$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionOverviewResponse>> {
    return getOverview(this.http, this.rootUrl, params, context);
  }

  /**
   * get overview of the last months.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOverview$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOverview(params?: GetOverview$Params, context?: HttpContext): Observable<TransactionOverviewResponse> {
    return this.getOverview$Response(params, context).pipe(
      map((r: StrictHttpResponse<TransactionOverviewResponse>): TransactionOverviewResponse => r.body)
    );
  }

  /** Path part for operation `getStats()` */
  static readonly GetStatsPath = '/transaction/stats/{month}';

  /**
   * Get stats of specific month.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStats()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStats$Response(params: GetStats$Params, context?: HttpContext): Observable<StrictHttpResponse<TransactionStatsResponse>> {
    return getStats(this.http, this.rootUrl, params, context);
  }

  /**
   * Get stats of specific month.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStats(params: GetStats$Params, context?: HttpContext): Observable<TransactionStatsResponse> {
    return this.getStats$Response(params, context).pipe(
      map((r: StrictHttpResponse<TransactionStatsResponse>): TransactionStatsResponse => r.body)
    );
  }

}
