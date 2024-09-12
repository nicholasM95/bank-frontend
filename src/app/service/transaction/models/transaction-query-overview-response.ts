/* tslint:disable */
/* eslint-disable */
import {TransactionDetailStatsResponse} from '../models/transaction-detail-stats-response';

export interface TransactionQueryOverviewResponse {
    data: Array<TransactionDetailStatsResponse>;
    first: number;
    last: number;
    next: number;
    previous: number;
    totalAmount: number;
}
