/* tslint:disable */
/* eslint-disable */
import {TransactionDetailTableResponse} from './transaction-detail-table-response';

export interface TransactionQueryOverviewResponse {
    data: Array<TransactionDetailTableResponse>;
    first: number;
    last: number;
    next: number;
    previous: number;
    totalAmount: number;
}
