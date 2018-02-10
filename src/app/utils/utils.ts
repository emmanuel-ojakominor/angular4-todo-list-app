import { Response } from '@angular/http';
import { Observable } from 'rxjs';

/**
 * Extracts the information received as response from a HTTP request
 * @param res a HTTP response
 */
export const extractData = (res: Response) => {
    const body = res.json();
    return body || {};
};

/**
 * Handles possible error in the response of an HTTP request
 * @param error a HTTP response with error status code
 */
export const handleError = (error: Response | any) => {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.message || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} Details: ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error( errMsg );
    return Observable.throw( errMsg );
};