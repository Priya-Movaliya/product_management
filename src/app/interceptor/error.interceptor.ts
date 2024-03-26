import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { SnackbarService } from '../common/snackbar.service';
import { LoaderService } from '../common/loader.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /** counter for http request */
  counter = 0;
  constructor(private snackBarService: SnackbarService, private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();
    this.counter++;

    return next.handle(request).pipe(
      finalize(() => { 
        this.counter--; 
        if(this.counter == 0) { 
          this.loaderService.hide();
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          errorMessage = 'Unauthorized access';
        } else if (error.status === 404) {
          errorMessage = 'Request not found';
        } else {
          // server-side error
          errorMessage = error.message;
        }
        
        this.snackBarService.showMessage(errorMessage, 'errorSnack')

        return throwError(errorMessage);
      })
    );
  }
}
