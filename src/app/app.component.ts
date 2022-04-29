import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from './api.service';
import { AppState } from './state/app.state';
import { retrievedManufacturers, retrievedProducts, retrievedRoles, retrievedSources, retrievedSteps, retrievedUsers } from './state/misc/misc.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  opened = false
  constructor(
    private api: ApiService,
    private store: Store<AppState>,
    private scrolll: ViewportScroller,
  ) { }

  ngOnInit(): void {
    this.api.Steps().subscribe(steps => {
      this.store.dispatch(retrievedSteps({ steps: steps || [] }))
    })
    this.api.Users().subscribe(users => {
      this.store.dispatch(retrievedUsers({ users: users || []}))
    })
    this.api.Roles().subscribe(roles => {
      this.store.dispatch(retrievedRoles({ roles: roles || []}))
    })
    this.api.Sources().subscribe(sources => {
      this.store.dispatch(retrievedSources({ sources: sources || []}))
    })
    this.api.Products().subscribe(products => this.store.dispatch(retrievedProducts({products: products || []})))
    this.api.Manufacturers().subscribe(manufacturers => this.store.dispatch(retrievedManufacturers({manufacturers: manufacturers || []})))

  }
  toggle() {
    if (this.scrolll.getScrollPosition()[1] != 0) {
      this.scrolll.scrollToPosition([0, 0])
    }
    this.opened = !this.opened
  }
 }
