import {
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringComponent } from './string/string.component';
import { ChipComponent } from './chip/chip.component';
import { CaseComponent } from './case/case.component';
import { NotesService } from './notes.service';
import { KeySelectorComponent } from './key-selector/key-selector.component';
import { ArmComponent } from './arm/arm.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
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
