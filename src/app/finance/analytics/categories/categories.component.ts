import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass'],
  providers: [AnalyticsService],
})
export class CategoriesComponent implements OnInit {
  constructor(private analytics: AnalyticsService) { }

  ngOnInit(): void {
    this.analytics.Categories({}).subscribe(res => console.log(res))
  }

}
