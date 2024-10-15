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
  notesIterable: Iterable<Note>;

  constructor(private notesService: NotesService, private notesConfigService: NotesConfigService,) {
    this.notesIterable = this.notesService.getStringIterable(this.note);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['note']) {
      this.notesIterable = this.notesService.getStringIterable(this.note);
    }
  }
}
