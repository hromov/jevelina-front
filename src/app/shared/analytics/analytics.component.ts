import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Analytics } from '../model';

interface NameValue {
  Name: string
  Value: string
}

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.sass']
})
export class AnalyticsComponent implements OnChanges {
  @Input() analytics: Analytics
  panelOpenState: boolean
  metrics: NameValue[] = []
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.analytics) {
      this.metrics = []
      let k: keyof typeof this.analytics;
      for (k in this.analytics) {
        const v = this.analytics[k]
        if (v != "") {
          this.metrics.push({Name: k,Value: v})
        }
      }
    }
  }

}
