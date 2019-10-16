import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService:AuthenticationService,private router:Router) { }
  
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot,
   state: import("@angular/router").RouterStateSnapshot): 
   boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | 
   import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    
    return this.authService.loginUser.pipe(take(1),map(user=>{
       const auth=!!user;
       if(auth){
         return true;
       }
       return this.router.createUrlTree(['/auth']);
    }))

  }
}
