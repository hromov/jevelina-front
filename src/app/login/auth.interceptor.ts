import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    authToken: string

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (this.authToken) {
             const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.authToken}`)
            })
            return next.handle(authReq)
        }
        return next.handle(req);
    }

    constructor(private auth: AuthService) {
        this.auth.socialUser$.subscribe(user => user ? this.authToken = user.authToken : this.authToken = "")
    }
}