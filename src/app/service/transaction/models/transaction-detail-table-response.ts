/* tslint:disable */
/* eslint-disable */
import {TransactionTagResponse} from './transaction-tag-response';

export interface TransactionDetailTableResponse {
    amount: number;
    bookingDate: string;
    currency: string;
    id: string;
    name: string;
    tags: Array<TransactionTagResponse>;
}
