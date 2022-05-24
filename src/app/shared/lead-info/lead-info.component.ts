import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { selectLead } from 'src/app/state/leads/leads.selector';
import { Lead } from '../model';

@Component({
  selector: 'lead-info',
  templateUrl: './lead-info.component.html',
  styleUrls: ['./lead-info.component.sass']
})
export class LeadInfoComponent implements OnInit {
  @Input() id: number
  lead$: Observable<Lead>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.lead$ = this.store.select(selectLead(this.id))
  }

}
