import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  // user$: ObserSocialUser;
  // // loggedIn: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signInWithGoogle()
  }

  signOut() {
    this.authService.signOut()
  }  

}
