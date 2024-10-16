import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringComponent } from './string/string.component';
import { ChipComponent } from './chip/chip.component';
import { CaseComponent } from './case/case.component';
import { NotesService } from './notes.service';
import { KeySelectorComponent } from './key-selector/key-selector.component';
import { ArmComponent } from './arm/arm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    StringComponent,
    ChipComponent,
    CaseComponent,
    KeySelectorComponent,
    ArmComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'acordes';
  showKeySelect = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private notesService: NotesService
  ) {}

  exitKeySelect() {
    this.showKeySelect = false;
  }
  toggleKeySelect() {
    this.showKeySelect = !this.showKeySelect;
    if (this.showKeySelect) {
      this.cdr.detectChanges();
    }
  }
}
