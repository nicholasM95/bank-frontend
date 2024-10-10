/* tslint:disable */

/* eslint-disable */
export interface ProblemDetailResponse {

    /**
     * A human-readable explanation specific to this occurrence of the problem
     */
    detail: string;

    /**
     * A URI reference that identifies the specific occurrence of the problem
     */
    instance: string;

    /**
     * The HTTP status code generated by the origin server for this occurrence of the problem
     */
    status: number;

    /**
     * A short, human-readable summary of the problem type
     */
    title: string;
}