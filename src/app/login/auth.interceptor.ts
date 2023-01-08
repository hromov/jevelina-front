import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { Observable, interval, Subscription, map, catchError, throwError, first } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authToken: string
  refresher = interval(1000 * 60 * 50)
  refresherSub: Subscription

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<any> {
    if (this.authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.authToken}`)
      })
      return next.handle(authReq)
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.error);
        if (error.status === 401 || error.status === 403) {
          this.auth.refreshToken().pipe(first())
            .pipe(catchError((err) => {
              console.log(err)
              this.router.navigate(['restricted']).then(_ => console.log('redirect to login'));
              return err
            }))
            .subscribe(() => {
              location.reload();
            });
        }
        return throwError(error);
      }));;
  }

  constructor(private auth: AuthService, private router: Router) {
    this.auth.socialUser$.subscribe(user => {
      if (user) {
        this.authToken = user.authToken
        this.refresherSub = this.refresher.subscribe(() => this.auth.refreshToken().pipe(first()).subscribe())

      } else {
        this.authToken = ""
        this.refresherSub.unsubscribe()
      }
    })
  }
}