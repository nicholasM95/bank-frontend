/* tslint:disable */
/* eslint-disable */
import {TransactionDetailStatsResponse} from './transaction-detail-stats-response';

export interface TransactionStatsResponse {
    incoming: Array<TransactionDetailStatsResponse>;
    outgoing: Array<TransactionDetailStatsResponse>;
}
