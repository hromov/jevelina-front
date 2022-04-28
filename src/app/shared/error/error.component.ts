import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass']
})
export class ErrorComponent implements OnChanges {
  @Input() error: string
  showMessage: boolean
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.error) {
      this.showMessage = true
    }
  }

  onClose() {
    this.showMessage = false;

  }

}
