import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { path } from 'src/app/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {
  events: any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${path}/events/transfers`).pipe(first()).subscribe(events => this.events = events)
  }

}
