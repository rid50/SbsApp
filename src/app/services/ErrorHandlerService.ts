import { ErrorHandler, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(
        private errorDialogService: ErrorDialogService,
        private zone: NgZone
    ) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleError(error: any): void {
        //console.log('Error handler (HttpErrorResponse): ' + (error instanceof HttpErrorResponse));
        // Check if it's an error from an HTTP response
        // if (!(error instanceof HttpErrorResponse)) {
        //     error = error.rejection; // get the error object
        // }

        this.zone.run(() =>
            this.errorDialogService.openDialog(
                error?.message || 'Undefined client error',
                error?.status
            )
        );

        //console.error('Error from global error handler', error);
    }

    // constructor(@Inject(Injector) private injector: Injector) { }

    // private get toastrService(): ToastrService {
    //     return this.injector.get(ToastrService);
    // }

    // handleError(error: Error | HttpErrorResponse): void {
    //     //this.toastr.error(error.message)
    //     //console.log('GlobalErrorHandlerService')
    //     //console.error(error);
    //     this.toastrService.error(
    //         error.message,
    //         'Error',
    //         {
    //             timeOut: 4000,
    //         }
    //     );
    // }
}