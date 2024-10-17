import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../notes.service';
import { NotesConfigService } from '../notes-config.service';
import { type Note, NoteName } from '../../util/notes';
import { CaseComponent } from '../case/case.component';

@Component({
  selector: 'app-string',
  standalone: true,
  imports: [CommonModule, CaseComponent],
  templateUrl: './string.component.html',
  styleUrl: './string.component.scss',
})
export class StringComponent {
  @Input() note!: NoteName;
  @Input() stringNumber!: number;

  constructor(private notesService: NotesService) {}

  getNotesIterable(): Iterable<{ note: Note; index: number }> {
    return this.notesService.getStringIterable(this.note);
  }
}
