import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Lead } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { leadRequired } from 'src/app/state/leads/leads.actions';
import { selectLead } from 'src/app/state/leads/leads.selector';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.sass']
})
export class LeadComponent implements OnInit {
  lead$: Observable<Readonly<Lead>> 
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const ID: number = params["id"]
      // console.log(params["id"])
      if (ID) {
        this.store.dispatch(leadRequired({id: ID}))
        this.lead$ = this.store.select(selectLead(ID))
      }
    })
  }
}
