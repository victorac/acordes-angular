import { Injectable } from '@angular/core';
import { Interval, NoteName } from '../util/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesConfigService {
  private includedIntervals: Interval[] = [
    Interval.Root,
    Interval.MinorThird,
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
    Interval.MajorSeventh
  ];

  constructor() { }

  getIncludedIntervals(): Interval[] {
    return this.includedIntervals;
  }

  isIntervalIncluded(interval: Interval): boolean {
    return this.includedIntervals.includes(interval);
  }
}
