import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringComponent } from './string/string.component';
import { ChipComponent } from './chip/chip.component';
import { CaseComponent } from './case/case.component';
import { KeySelectorComponent } from './key-selector/key-selector.component';
import { ArmComponent } from './arm/arm.component';
import { CommonModule } from '@angular/common';
import { NotesConfigService } from './notes-config.service';

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
    private notesConfigService: NotesConfigService
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

  toggleMinor() {
    this.notesConfigService.toggleMinor();
  }

  toggleMajor7() {
    this.notesConfigService.toggleMajor7();
  }

  showMinor() {
    return this.notesConfigService.showMinor;
  }

  showMajor7() {
    return this.notesConfigService.showMajor7;
  }
}
