export enum NoteName {
  C = 'C',
  CSharp = 'C#-Db',
  D = 'D',
  DSharp = 'D#-Eb',
  E = 'E',
  F = 'F',
  FSharp = 'F#-Gb',
  G = 'G',
  GSharp = 'G#-Ab',
  A = 'A',
  ASharp = 'A#-Bb',
  B = 'B'
}

export enum Interval {
  Root = 'R',
  MinorSecond = 'm2',
  MajorSecond = 'M2',
  MinorThird = 'm3',
  MajorThird = '3',
  PerfectFourth = 'P4',
  Tritone = 'TT',
  PerfectFifth = '5',
  MinorSixth = 'm6',
  MajorSixth = 'M6',
  MinorSeventh = 'm7',
  MajorSeventh = 'M7'
}

export type Note = {
  name: NoteName;
  interval: Interval;
};

const INTERVALS = Object.values(Interval);
export const NOTES = Object.values(NoteName);

export default class Notes {
  private rootIndex: number;
  private intervalTable: Note[] = [];

  constructor(startingNote: NoteName = NOTES[0]) {
    this.rootIndex = NOTES.indexOf(startingNote);
    for (let i = 0; i < NOTES.length; i++) {
      let index = (this.rootIndex + i) % NOTES.length;
      this.intervalTable[index] = { name: NOTES[index], interval: INTERVALS[i] };
    }
  }

  getRoot(): NoteName {
    return NOTES[this.rootIndex];
  }

  setRoot(noteName: NoteName): void {
    if (!Object.values(NoteName).includes(noteName)) {
      throw new Error('Invalid root index');
    }
    this.rootIndex = NOTES.indexOf(noteName);
    for (let i = 0; i < NOTES.length; i++) {
      let index = (this.rootIndex + i) % NOTES.length;
      this.intervalTable[index].interval = INTERVALS[i];
    }
  }

  getNote(interval: Interval): NoteName {
    const index = this.intervalTable.findIndex(note => note.interval === interval);
    if (index === -1) {
      throw new Error('Invalid interval');
    }
    return this.intervalTable[index].name;
  }

  *[Symbol.iterator](): Iterator<Note> {
    for (let i = 0; i < this.intervalTable.length; i++) {
      yield this.intervalTable[i];
    }
  }

  *getStringGenerator(startingNote: NoteName): Iterator<{note: Note, index: number}> {
    let noteIndex = this.intervalTable.findIndex(note => note.name === startingNote); 
    for (let i = 0; i < this.intervalTable.length; i++) {
      let index = (noteIndex + i) % this.intervalTable.length;
      yield {note: this.intervalTable[index], index: i};
    }
  }
}