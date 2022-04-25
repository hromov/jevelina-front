import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function getScrollPercent() {
  const h = document.documentElement
  const b = document.body
  const st = 'scrollTop'
  const sh = 'scrollHeight'
  return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  // sections: string[] = ['header', 'content', 'footer']

  // currentSection: BehaviorSubject<string> = new BehaviorSubject('home');
  percentage: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private vs: ViewportScroller) {
    document.addEventListener('scroll', () => {
      this.keepTrack();
    })
  }

  keepTrack() {
    const h = document.documentElement
    const b = document.body
    const st = 'scrollTop'
    const sh = 'scrollHeight'
    const percentage = Math.round((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 20) * 5 ;
    this.percentage.next(percentage)
    // for (var section of this.sections) {

    //   const element = document.getElementById(section);
    //   if (element != null) {
    //     const rect = element.getBoundingClientRect();
    //     if (rect.top >= 0 && rect.top < viewHeight / 2) {
    //       this.currentSection.next(section);
    //     }
    //   } else {
    //     console.log("element is NULL")
    //   }
    // }
  }
}
