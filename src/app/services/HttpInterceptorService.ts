/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseApiUrlService } from '../app.module';
import { ToastrService } from 'ngx-toastr';
//import { BaseApiUrlService } from './BaseApiUrlService';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router,
    @Inject(BaseApiUrlService) private apiUrl: BehaviorSubject<string>,
    @Inject(Injector) private injector: Injector) { }

  private get toastrService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  //1.  No Errors
  intercept1(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error in intercept')
        console.error(error);
        return throwError(error.message);
      })
    )
  }

  //2. Sending an Invalid Token will generate error
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //   const token = 'invald token';
    //   req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

    return next.handle(req).pipe(
      catchError((error: Error) => {

        if (req.url.indexOf('https://') != -1) {
          error.message = 'Invalid SSL/TLS Certificate, going insecure'
          this.toastrService.error(
            error.message,
            'Error',
            {
              timeOut: 4000,
            }
          );
        }

        //setTimeout(() => {
        // clone request and replace 'https://' with 'http://' at the same time
        const secureReq = req.clone({
          url: req.url.replace('https://', 'http://')
        });

        this.apiUrl.next(this.apiUrl.value.replace('https://', 'http://'))

        // send the cloned, "secure" request to the next handler.
        return next.handle(secureReq)
        //}, 1000)
      })
    )
  }

  intercept3(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

    return next.handle(req).pipe(
      catchError((error) => {

        let handled = false;
        console.error(error);
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            console.log(`error status : ${error.status} ${error.statusText}`);
            switch (error.status) {
              case 401:      //login
                this.router.navigateByUrl('/login');
                console.log('redirect to login');
                handled = true;
                break;
              case 403:     //forbidden
                this.router.navigateByUrl('/login');
                console.log('redirect to login');
                handled = true;
                break;
            }
          }
        }
        else {
          console.error('Other Errors');
        }

        if (handled) {
          console.log('return back ');
          return of(error);
        } else {
          console.log('throw error back to to the subscriber');
          return throwError(error);
        }

      })
    )
  }
}