import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first, map, Observable, Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  socialUserSubject: BehaviorSubject<SocialUser> = new BehaviorSubject<SocialUser>(null)
  socialUser$: Observable<SocialUser> = this.socialUserSubject.asObservable()
  userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null)
  user$: Observable<User> = this.userSubject.asObservable()
  constructor(private authService: SocialAuthService, private router: Router, private api: ApiService) {
    const expiring = JSON.parse(localStorage.getItem("expiring"))
    if (new Date(expiring) > new Date()) {
      const socialProfile = JSON.parse(localStorage.getItem("socialUser"))
      const userProfile = JSON.parse(localStorage.getItem("userProfile"))
      if (socialProfile && userProfile) {
        this.socialUserSubject.next(socialProfile)
        this.userSubject.next(userProfile)
        this.refreshToken()
      }
    }

    this.authService.authState.subscribe((socialUser) => {
      if (socialUser) {
        this.socialUserSubject.next(socialUser)
        this.api.UserCheck().pipe(first()).subscribe({
          next: (user) => {
            if (user) {
              this.userSubject.next(user)
              localStorage.setItem("userProfile", JSON.stringify(user))
              localStorage.setItem("socialUser", JSON.stringify(socialUser))
              this.setExpiring()
            }
          },
          error: () => confirm("Access denied"),
        })
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem("socialUser")
    localStorage.removeItem("userProfile")
    this.socialUserSubject.next(null)
    this.userSubject.next(null)
    this.router.navigateByUrl("/restricted")
  }

  get isUser(): boolean {
    return this.userSubject.getValue() != null
  }

  get isAdmin(): boolean {
    const user = this.userSubject.getValue()
    return user && user.Role.Role == "Admin"
  }

  get currentUser(): User {
    return this.userSubject.getValue()
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

  setExpiring() {
    let t = new Date()
    t.setMinutes(t.getMinutes() + 50)
    localStorage.setItem("expiring", JSON.stringify(t))
  }

}
