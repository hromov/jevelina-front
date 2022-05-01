import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null)
  user$: Observable<SocialUser> = this.userSubject.asObservable()
  logedIn: boolean
  constructor(private authService: SocialAuthService) {
    // console.log("autho construcor")
    const userProfile = JSON.parse(localStorage.getItem("userProfile"))
    if (userProfile) {
      // console.log(userProfile)
      this.userSubject.next(userProfile)
    }
    this.authService.authState.subscribe((user) => {
      // console.log(user)
      this.userSubject.next(user)
      if (user) {
        this.logedIn = true
        localStorage.setItem("userProfile", JSON.stringify(user))
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    if (this.logedIn) {
      this.authService.signOut();
    }
    this.logedIn = false
    localStorage.removeItem("userProfile")
    this.userSubject.next(null)
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
