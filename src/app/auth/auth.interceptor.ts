import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { JwtService } from '../shared/services/jwt.service';
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private jwtService: JwtService, private router: Router, ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.jwtService.getToken()}`
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      () => { }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigateByUrl('/login')
        }
      }
    });
  }
}