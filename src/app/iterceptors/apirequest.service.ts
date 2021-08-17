import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ApirequestService implements HttpInterceptor{

  constructor(
    private auth: UserService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    let request = req;
    const regexp = new RegExp(environment.urlServer,'i');
    if(req.url.search(regexp)>=0){
      const token = this.auth.getToken();
      console.log(req.url);
      if(token){
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type':'application/json',
          });
        request = req.clone({ headers });
      }
      //console.log(request.headers.keys())
    }
    return next.handle(request);
  }
}
