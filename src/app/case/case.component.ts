import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesConfigService } from '../notes-config.service';
import { Interval, NoteName } from '../../util/notes';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case.component.html',
  styleUrl: './case.component.scss',
})
export class CaseComponent {
  @Input() note!: NoteName;
  @Input() interval!: Interval;
  @Input() stringNumber!: number;
  @Input() caseNumber!: number;

  constructor(private notesConfigService: NotesConfigService) {}

  isIntervalIncluded(): boolean {
    return this.notesConfigService.isIntervalIncluded(this.interval);
  }

  getMaxCaseNumber(): number {
    return this.notesConfigService.maxCases;
  }
}
