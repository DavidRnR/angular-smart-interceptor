import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class ApiService {

    constructor(private httpClient: HttpClient) { }


    httpGet(endpoint: string, options = null): Observable<any> {
        if (options) {
            return this.httpClient.get(environment.apiURL + endpoint, options);
        } else {
            return this.httpClient.get(environment.apiURL + endpoint);
        }
    }

    httpPost(endpoint: string, body: any): Observable<any> {
        return this.httpClient.post(environment.apiURL + endpoint, body);
    }

    httpPut(endpoint: string, body: any): Observable<any> {
        return this.httpClient.put(environment.apiURL + endpoint, body);
    }

    httpDelete(endpoint: string): Observable<any> {
        return this.httpClient.delete(environment.apiURL + endpoint);
    }
}
