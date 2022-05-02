import { Component, Input, OnInit } from '@angular/core';
import { Lead } from '../model';

@Component({
  selector: 'leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.sass']
})
export class LeadsListComponent implements OnInit {
  @Input() leads: ReadonlyArray<Lead>
  constructor() { }

  ngOnInit(): void {
  }

}
