import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MiscService } from './misc/misc.service';
import { AppState } from './state/app.state';
import { retrievedSteps } from './state/misc/misc.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  opened = false
  constructor(
    private miscService: MiscService,
    private store: Store<AppState>,
    private scrolll: ViewportScroller,
  ) { }

  ngOnInit(): void {
    this.miscService.Steps().subscribe(steps => {
      this.store.dispatch(retrievedSteps({ steps: steps || [] }))
    })

  }
  toggle() {
    if (this.scrolll.getScrollPosition()[1] != 0) {
      this.scrolll.scrollToPosition([0, 0])
    }
    this.opened = !this.opened
  }
 }
