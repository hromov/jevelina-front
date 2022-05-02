import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null)
  user$: Observable<SocialUser> = this.userSubject.asObservable()
  logedIn: boolean
  isAdmin: boolean
  constructor(private authService: SocialAuthService, private router: Router) {
    console.log("autho construcor")
    const userProfile = JSON.parse(localStorage.getItem("userProfile"))
    if (userProfile) {
      this.userSubject.next(userProfile)
      this.logedIn = true
      this.isAdmin = true
    }
    this.authService.authState.subscribe((user) => {
      // console.log(user)
      this.userSubject.next(user)
      if (user) {
        this.logedIn = true
        this.isAdmin = true
        localStorage.setItem("userProfile", JSON.stringify(user))
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.logedIn = false
    this.isAdmin = false
    localStorage.removeItem("userProfile")
    this.userSubject.next(null)
    this.router.navigateByUrl("/restricted")
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
