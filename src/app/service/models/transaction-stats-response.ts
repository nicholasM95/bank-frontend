/* tslint:disable */
/* eslint-disable */
import { TransactionDetailStatsResponse } from '../models/transaction-detail-stats-response';
export interface TransactionStatsResponse {
  incoming: Array<TransactionDetailStatsResponse>;
  outgoing: Array<TransactionDetailStatsResponse>;
}
