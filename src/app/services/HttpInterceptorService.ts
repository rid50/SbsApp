/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BaseApiUrlService } from '../app.module';
import { ToastrService } from 'ngx-toastr';
import { LoadingDialogService } from './loading-dialog.service';
//import { BaseApiUrlService } from './BaseApiUrlService';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public router: Router,
    @Inject(BaseApiUrlService) private apiUrl: BehaviorSubject<string>,
    @Inject(Injector) private injector: Injector,
    //private loadingDialogService: LoadingDialogService
  ) { }

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
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //   const token = 'invald token';
    //   req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    //this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      
      //retry(1),
      catchError(error => {
        //console.log('Http interceptor (HttpErrorResponse): ' + (error instanceof HttpErrorResponse));
        // let errorMessage
        // if (request.url.indexOf('https://') != -1) {
        //   errorMessage = 'Invalid TLS Server Certificate, going insecure'
        //   //return throwError(error);
        //   this.toastrService.error(
        //     errorMessage,
        //     'Error',
        //     {
        //       timeOut: 4000,
        //     }
        //   );
        // }

        // clone request and replace 'https://' with 'http://' at the same time
        // const secureReq = request.clone({
        //   url: request.url.replace('https://', 'http://')
        // });

        this.apiUrl.next(this.apiUrl.value.replace('https://', 'http://'))

        let loc = window.location.origin
        console.log('1: ' + loc)
        if (loc.indexOf('https://') != -1) {
          loc = loc.replace('https://', 'http://')
        }

        console.log('2: ' + loc)

        this.router.navigateByUrl(loc)

        // send the cloned, "secure" request to the next handler.
        // return next.handle(secureReq)
        return of(error);
      }),
      // finalize(() => {
      //   this.loadingDialogService.hideDialog();
      // })      
    ) as Observable<HttpEvent<any>>;
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