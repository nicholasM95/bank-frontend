/* tslint:disable */
/* eslint-disable */
import {HttpClient, HttpContext} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';

import {ContactResponse} from '../models/contact-response';
import {createContact, CreateContact$Params} from '../fn/contact/create-contact';
import {getAllContacts, GetAllContacts$Params} from '../fn/contact/get-all-contacts';
import {getContactById, GetContactById$Params} from '../fn/contact/get-contact-by-id';


/**
 * contact
 */
@Injectable({providedIn: 'root'})
export class ContactService extends BaseService {
    constructor(config: ApiConfiguration, http: HttpClient) {
        super(config, http);
    }

    /** Path part for operation `getAllContacts()` */
    static readonly GetAllContactsPath = '/contact';

    /**
     * Get all contacts.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getAllContacts()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllContacts$Response(params?: GetAllContacts$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ContactResponse>>> {
        return getAllContacts(this.http, this.rootUrl, params, context);
    }

    /**
     * Get all contacts.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getAllContacts$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getAllContacts(params?: GetAllContacts$Params, context?: HttpContext): Observable<Array<ContactResponse>> {
        return this.getAllContacts$Response(params, context).pipe(
            map((r: StrictHttpResponse<Array<ContactResponse>>): Array<ContactResponse> => r.body)
        );
    }

    /** Path part for operation `createContact()` */
    static readonly CreateContactPath = '/contact';

    /**
     * Create a new contact.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `createContact()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createContact$Response(params: CreateContact$Params, context?: HttpContext): Observable<StrictHttpResponse<ContactResponse>> {
        return createContact(this.http, this.rootUrl, params, context);
    }

    /**
     * Create a new contact.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `createContact$Response()` instead.
     *
     * This method sends `application/json` and handles request body of type `application/json`.
     */
    createContact(params: CreateContact$Params, context?: HttpContext): Observable<ContactResponse> {
        return this.createContact$Response(params, context).pipe(
            map((r: StrictHttpResponse<ContactResponse>): ContactResponse => r.body)
        );
    }

    /** Path part for operation `getContactById()` */
    static readonly GetContactByIdPath = '/contact/{id}';

    /**
     * Get contact by id.
     *
     *
     *
     * This method provides access to the full `HttpResponse`, allowing access to response headers.
     * To access only the response body, use `getContactById()` instead.
     *
     * This method doesn't expect any request body.
     */
    getContactById$Response(params: GetContactById$Params, context?: HttpContext): Observable<StrictHttpResponse<ContactResponse>> {
        return getContactById(this.http, this.rootUrl, params, context);
    }

    /**
     * Get contact by id.
     *
     *
     *
     * This method provides access only to the response body.
     * To access the full response (for headers, for example), `getContactById$Response()` instead.
     *
     * This method doesn't expect any request body.
     */
    getContactById(params: GetContactById$Params, context?: HttpContext): Observable<ContactResponse> {
        return this.getContactById$Response(params, context).pipe(
            map((r: StrictHttpResponse<ContactResponse>): ContactResponse => r.body)
        );
    }

}
