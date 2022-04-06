import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, /*HTTP_INTERCEPTORS*/ } from "@angular/common/http";
import { CompileShallowModuleMetadata } from "@angular/compiler";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Observable, throwError, EMPTY } from "rxjs";
import { catchError, switchMap, tap} from "rxjs/operators";
import { HttpService } from "./http.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    httpService;
    refreshTokenInProgress = false;

    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector, private router: Router) {}

    refreshToken(): Observable<any> {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.refreshTokenInProgress = true;

            return this.httpService.login().pipe(
                tap((res: any) => {
                    if (res && res.Token) {
                        this.httpService.updateToken(res.Token);
                        localStorage.setItem('j4u_hrtoken', res.Token);
                    }
                    this.refreshTokenInProgress = false;
                    this.tokenRefreshedSource.next();
                }),
                catchError(() => {
                    this.refreshTokenInProgress = false;
                    this.logout();
                    return EMPTY;
                }));
        }
    }

    logout() {
        this.httpService.logout();
        //this.router.navigate(["login"]);
    }

    handleResponseError(error: HttpErrorResponse, request?, next?) {
        // Invalid token error
        if (error.status === 404 && error.error.err == -2) { // User Timeout
            return this.refreshToken().pipe(
                switchMap(() => {
                    request = this.httpService.updateReqToken(request);
                    return next.handle(request);
                }),
                catchError(() => {
                    this.logout();
                    return EMPTY;
                }));
        }

        return throwError(error);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.httpService = this.injector.get(HttpService);

        // Handle response
        return next.handle(request).pipe(catchError(error => {
            return this.handleResponseError(error, request, next);
        }));
    }
}

// export const AuthInterceptorProvider = {
//     provide: HTTP_INTERCEPTORS,
//     useClass: AuthInterceptor,
//     multi: true
// };