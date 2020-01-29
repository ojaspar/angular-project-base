import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
// import {MarketerAppState} from '../../state/app.state';s

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  authenticationToken$ = of();
  authenticationToken: string;

  constructor() {
    this.authenticationToken = localStorage.getItem("authToken");

    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(this.authenticationToken);
    console.log(decodedToken);
    console.log(this.authenticationToken);
    // console.log('decodedToken', decodedToken);
    const expirationDate = helper.getTokenExpirationDate(
      this.authenticationToken
    );
    // console.log('expirationDate', expirationDate);
    const isExpired = helper.isTokenExpired(this.authenticationToken);
    // console.log('isExpired', isExpired);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationToken}`
      }
    });

    return next.handle(request);
  }
}
