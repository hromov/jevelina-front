import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, first } from 'rxjs';
import { ApiService } from './api.service';
import { FinanceService } from './finance/finance.service';
import { LeadsService } from './leads/leads.service';
import { AuthService } from './login/auth.service';
import { AppState } from './state/app.state';
import { categoriesLoaded } from './state/finance/finance.actions';
import { retrievedManufacturers, retrievedProducts, retrievedRoles, retrievedSources, retrievedSteps, retrievedUsers } from './state/misc/misc.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  opened: boolean
  isAdmin: boolean
  constructor(
    private api: ApiService,
    private store: Store<AppState>,
    private scrolll: ViewportScroller,
    private leads: LeadsService,
    private router: Router,
    public auth: AuthService,
    private fs: FinanceService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.pipe(filter(user => !!user), first()).subscribe(() => {
      this.api.Steps().subscribe(steps => this.store.dispatch(retrievedSteps({ steps: steps || [] })))
      this.api.Users().subscribe(users => this.store.dispatch(retrievedUsers({ users: users || [] })))
      this.api.Roles().subscribe(roles => this.store.dispatch(retrievedRoles({ roles: roles || [] })))
      this.api.Sources().subscribe(sources => this.store.dispatch(retrievedSources({ sources: sources || [] })))
      this.api.Products().subscribe(products => this.store.dispatch(retrievedProducts({ products: products || [] })))
      this.api.Manufacturers().subscribe(manufacturers => this.store.dispatch(retrievedManufacturers({ manufacturers: manufacturers || [] })))
      this.fs.Categories().subscribe(categories => this.store.dispatch(categoriesLoaded({ categories: categories || [] })))
    })
  }
  toggle() {
    if (this.scrolll.getScrollPosition()[1] != 0) {
      this.scrolll.scrollToPosition([0, 0])
    }
    this.opened = !this.opened
  }
  newLead() {
    this.leads.Save({}).subscribe(lead => this.router.navigate(['leads', lead.ID]))
  }
}
