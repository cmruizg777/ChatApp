import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = '';

  constructor(public http: HttpClient) {
    this.url = environment.urlServer;
  }

  post(endpoint: string,  body: any): Observable<any> {
    const uri = this.url + '' + endpoint;
    /* console.log(uri); */
    return this.http.post(this.url + '' + endpoint, body).pipe(retry(3));
  }

  patch(endpoint: string,  body: any) {
    const uri = this.url + '' + endpoint;
    return this.http.patch(this.url + '' + endpoint, body).pipe(retry(3));
  }

  get(endpoint: string ): Observable<any> {
    return this.http.get(this.url + '' + endpoint).pipe(retry(3));
  }
  put(endpoint: string,  body: any) {
    return this.http.put(this.url + '' + endpoint, body).pipe(retry(3));
  }
  delete(endpoint: string ): Observable<any> {
    return this.http.delete(this.url + '' + endpoint).pipe(retry(3));
  }
}
