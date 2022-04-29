import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/shared/model';
import { AppState } from 'src/app/state/app.state';
import { contactRequired } from 'src/app/state/cotacts/contacts.actions';
import { selectContact } from 'src/app/state/cotacts/contacts.selectors';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {
  contact$: Observable<Readonly<Contact>> 
  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const ID: number = params["id"]
      // console.log(params["id"])
      if (ID) {
        this.store.dispatch(contactRequired({id: ID}))
        this.contact$ = this.store.select(selectContact(ID))
      }
    })
  }

}
