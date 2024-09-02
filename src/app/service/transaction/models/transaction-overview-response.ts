/* tslint:disable */
/* eslint-disable */
import {TransactionOverviewDatasetResponse} from './transaction-overview-dataset-response';

export interface TransactionOverviewResponse {
    datasets: Array<TransactionOverviewDatasetResponse>;
    labels: Array<string>;
}
