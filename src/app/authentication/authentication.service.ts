import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.module';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginUser = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) { }

  signup(user) {
    return this.http.post<any>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRvzJhrH2_I0Rth38KyKv0KDL9SU034Ks",
      {
        email: user.email,
        password: user.password,
        returnSecureToken: true
      }).pipe(tap(resp => {
        this.setUser(resp);
      }));
  }
  setUserToSession(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromSession() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  login(user) {
    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRvzJhrH2_I0Rth38KyKv0KDL9SU034Ks", {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }).pipe(tap(resp => {
      this.setUser(resp);
    }));
  }

  setUser(userResp) {
    const expiryDate = new Date(new Date().getTime() + userResp.expiresIn * 1000);
    const user = new User(
      userResp.email, userResp.localId, userResp.idToken, expiryDate
    );
    this.loginUser.next(user);
    this.setUserToSession(user);
    this.autoLogoutTimer(userResp.expiresIn * 1000);
  }

  logout() {
    this.loginUser.next(null);
    this.router.navigate(['auth']);
    sessionStorage.clear();
  }

  autoLogoutTimer(expiryTime){
    setTimeout(()=>{
      this.logout();
    },expiryTime);
  }

  autoLogin() {
    const user = this.getUserFromSession();
    if (!user) {
      return;
    }
    if (!user.token) {
      this.loginUser.next(new User(user.email, user.id, user._token, new Date(user._tokenExpiration)));
      const logout=new Date(user._tokenExpiration).getTime()-new Date().getTime();
      this.autoLogoutTimer(logout);
    }
  }
}
