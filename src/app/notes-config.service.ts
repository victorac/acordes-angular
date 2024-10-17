import { Injectable } from '@angular/core';
import { Interval } from '../util/notes';

@Injectable({
  providedIn: 'root',
})
export class NotesConfigService {
  private includedIntervals: Interval[] = [
    Interval.Root,
    Interval.MinorThird,
    Interval.MajorThird,
    Interval.PerfectFifth,
    Interval.MinorSeventh,
    Interval.MajorSeventh,
  ];

  showMajor7: boolean = true;
  showMinor: boolean = true;

  constructor() {}

  getIncludedIntervals(): Interval[] {
    return this.includedIntervals;
  }

  isIntervalIncluded(interval: Interval): boolean {
    return this.includedIntervals.includes(interval);
  }

  toggleMinor() {
    this.showMinor = !this.showMinor;
    if (this.showMinor) {
      this.includedIntervals.push(Interval.MinorThird);
    } else {
      this.includedIntervals = this.includedIntervals.filter(
        (interval) => interval !== Interval.MinorThird
      );
    }
  }

  toggleMajor7() {
    this.showMajor7 = !this.showMajor7;
    if (this.showMajor7) {
      this.includedIntervals.push(Interval.MajorSeventh);
    } else {
      this.includedIntervals = this.includedIntervals.filter(
        (interval) => interval !== Interval.MajorSeventh
      );
    }
  }

}
