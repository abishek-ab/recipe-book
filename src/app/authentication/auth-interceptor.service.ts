import { HttpInterceptor, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    //user:any;
    constructor(private authenticationService: AuthenticationService) { }
    intercept(req: import("@angular/common/http").HttpRequest<any>, next: import("@angular/common/http").HttpHandler):
        import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {

        //     this.authenticationService.loginUser.subscribe(u=>{this.user=u});
        //     if(!this.user){
        //         return next.handle(req);
        //     }
        //     const modifiedReq=req.clone({params:new HttpParams().set('auth',this.user.token)});
        //    return  next.handle(modifiedReq);
        return this.authenticationService.loginUser.pipe(
            take(1), exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
                return next.handle(modifiedReq);
            })
        )

    }

}