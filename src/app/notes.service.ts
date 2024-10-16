import { Injectable } from '@angular/core';
import Notes, { Interval, Note, NoteName } from '../util/notes';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes = new Notes();
  constructor() { }

  setRoot(key: NoteName): void{
    this.notes.setRoot(key);
  }

  getRoot(): NoteName{
    return this.notes.getRoot();
  }

  getNote(interval: Interval): string{
    return this.notes.getNote(interval);
  }

  getStringIterable(note: NoteName): Iterable<Note> {
    return {
      [Symbol.iterator]: () => this.notes.getStringGenerator(note)
    } 
  }
}

