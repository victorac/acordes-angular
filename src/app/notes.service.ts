import { Injectable } from '@angular/core';
import Notes, { Interval, Note, NoteName } from '../util/notes';
import { NotesConfigService } from './notes-config.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private notes: Notes;

  constructor(private notesConfigService: NotesConfigService) {
    this.notes = new Notes();
  }

  setRoot(key: NoteName): void {
    this.notes.setRoot(key);
  }

  getRoot(): NoteName {
    return this.notes.getRoot();
  }

  getNote(interval: Interval): string {
    return this.notes.getNote(interval);
  }

  getMaxCases(): number {
    return this.notesConfigService.maxCases;
  }

  getStringIterable(note: NoteName): Iterable<{note: Note, index: number}> {
    return {
      [Symbol.iterator]: () => this.notes.getStringGenerator(note),
    };
  }
}
