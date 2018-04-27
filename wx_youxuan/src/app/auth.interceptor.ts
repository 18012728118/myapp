import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/anthService';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', this.authService.getToken())
        });
        return next.handle(authReq);
    }
}