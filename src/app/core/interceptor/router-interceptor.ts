import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable, of } from "rxjs";
// import {MarketerAppState} from '../../state/app.state';
import { NavigationEnd, Router } from "@angular/router";
// import {SetURLState} from '../../state/app.action';

@Injectable()
export class RouterInterceptor implements HttpInterceptor {
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(private router: Router) {
    const executeDispatch = 0;
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
      // // if (executeDispatch < 2) {
      //
      //   executeDispatch++;
      // // }
      // this.store.dispatch(new SetURLState({prev: this.previousUrl, current: this.currentUrl}));
      console.log("These are the links: ", {
        prev: this.previousUrl,
        current: this.currentUrl
      });
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }
}
