import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
//import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {

    constructor(@Inject(Injector) private injector: Injector) { }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

    handleError(error: Error | HttpErrorResponse): void {
        //this.toastr.error(error.message)
        //console.log('GlobalErrorHandlerService')
        //console.error(error);
        this.toastrService.error(
            error.message,
            'Error',
            {
                timeOut: 4000,
            }
        );
    }
}