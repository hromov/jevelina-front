import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.sass']
})
export class RestrictedComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.user$.pipe(filter(user => !!user)).subscribe(() => this.router.navigateByUrl("/"))
  }

  logIn() {
    this.auth.signInWithGoogle()
  }

}
