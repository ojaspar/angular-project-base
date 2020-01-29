import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
export class HttpErrorInterceptor implements HttpInterceptor {
  errorMessage: string;

  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // retry(1),

      tap(evt => {
        // custom api errors
        if (evt instanceof HttpResponse) {
          if (evt.status >= 200 && evt.status <= 226) {
            console.log("fsbnsdfhsdbfnmfbdn");
            if (evt.body.code !== 1) {
              let errors: string;
              if (evt.body.errors) {
                if (!evt.body.errors.length) {
                  errors = "An error occurred";
                } else {
                  evt.body.errors.forEach(x => {
                    errors = `${x}`;
                  });
                }
              }

              switch (evt.body.code) {
                case -1: {
                  this.errorMessage = `${errors}  Code: ${evt.body.code}`;
                  break;
                }
                case 2: {
                  this.errorMessage = `${errors}   Code: ${evt.body.code}`;
                  break;
                }
                case -2: {
                  this.errorMessage = `${errors}  Code: ${evt.body.code}`;
                  break;
                }
                case -3: {
                  this.errorMessage = `${errors}  Code: ${evt.body.code}`;
                  break;
                }
                case -4: {
                  this.errorMessage = `${errors}   Code: ${evt.body.code}`;
                  break;
                }
                case -5: {
                  this.errorMessage = `${errors}   Code: ${evt.body.code}`;
                  break;
                }
              }

              if (this.errorMessage) {
                console.log(this.errorMessage);
              }
              // return throwError(this.errorMessage);
            }
          }
        }
      }),

      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if (error.status === 401) {
          const url = this.router.url;
          localStorage.removeItem("authToken");
          this.router.navigateByUrl("/login");
        }

        if (error.error instanceof ErrorEvent) {
          // client-side error
          this.errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          switch (error.status) {
            // case 500: {this.errorMessage = `Something went wrong internally, Our Engineers has been notified of this error. Please try again. \nCode: ${error.status}`; break; }
            case 503: {
              this.errorMessage = `Something went wrong internally, Our Engineers has been notified of this error. Please try again. \nCode: ${error.status}`;
              break;
            }
            case 400: {
              this.errorMessage =
                error.error.error_description !== null
                  ? error.error.error_description
                  : `Something went wrong, we were unable to process your request \nCode: ${error.status}`;
              break;
            }
            case 0: {
              this.errorMessage = `Something went wrong`;
              break;
            }
          }
        }

        if (this.errorMessage) {
          console.log(this.errorMessage);
        }

        if (error.status === 503 || error.status === 0) {
          return throwError(this.errorMessage);
        }
      })
    );
  }
}
