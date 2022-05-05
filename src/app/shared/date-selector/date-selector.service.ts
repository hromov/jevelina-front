import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MinMax {
  minDate: Date
  maxDate: Date
}

@Injectable()
export class DateSelectorService {
  private selectorSubject: BehaviorSubject<MinMax> = new BehaviorSubject(null)
  dateSelectors$: Observable<MinMax> = this.selectorSubject.asObservable()
  constructor() { }

  init(minMax: MinMax) {
    this.selectorSubject.next(minMax)
  }

  from(val: any) {
    this.selectorSubject.next({...this.selectorSubject.getValue(), minDate: val})
  }

  to(val: any) {
    this.selectorSubject.next({...this.selectorSubject.getValue(), maxDate: val})
  }
}
