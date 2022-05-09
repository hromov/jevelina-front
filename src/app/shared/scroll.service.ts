import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ScrollService {
  percentage: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor() {
    const drawer = document.getElementById("drawer")
    const scroll = document.getElementById("scroll")
    let that = this
    document.getElementById("drawer").addEventListener('scroll', function(e) {
      that.keepTrack(drawer, scroll)      
    });
  }

  keepTrack(h: any, b: any) {
    const st = 'scrollTop'
    const sh = 'scrollHeight'
    const percentage = Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 20) * 5 ;
    this.percentage.next(percentage)
  }
}
