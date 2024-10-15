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
import { NoteName, NOTES } from '../util/notes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StringComponent, ChipComponent, CaseComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'acordes';
  showKeySelect = false;
  keySelectInitialized = false;
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  strings: NoteName[] = [NoteName.E, NoteName.A, NoteName.D, NoteName.G, NoteName.B, NoteName.E];
  allKeys: NoteName[] = NOTES;

  private mouseDownListener: any;
  private mouseLeaveListener: any;
  private mouseUpListener: any;
  private mouseMoveListener: any;

  constructor(private cdr: ChangeDetectorRef, private notesService: NotesService) {}

  getRoot(): NoteName {
    return this.notesService.getRoot();
  }

  ngAfterViewChecked() {
    if (this.showKeySelect && this.scrollable && !this.keySelectInitialized) {
      this.initializeKeySelect();
      this.keySelectInitialized = true;
    } else if (!this.showKeySelect && this.keySelectInitialized) {
      this.detachListeners();
      this.keySelectInitialized = false;
    }
  }
  initializeKeySelect() {
    const scrollable = this.scrollable?.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    this.mouseDownListener = (e: { pageX: number }) => {
      isDown = true;
      scrollable.classList.add('active');
      startX = e.pageX - scrollable.offsetLeft;
      scrollLeft = scrollable.scrollLeft;
    };

    this.mouseLeaveListener = () => {
      isDown = false;
      scrollable.classList.remove('active');
    };

    this.mouseUpListener = () => {
      isDown = false;
      scrollable.classList.remove('active');
    };

    this.mouseMoveListener = (e: {
      preventDefault: () => void;
      pageX: number;
    }) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollable.offsetLeft;
      const walk = (x - startX) * 1.2; //scroll-fast
      scrollable.scrollLeft = scrollLeft - walk;
    };

    scrollable.addEventListener('mousedown', this.mouseDownListener);
    scrollable.addEventListener('mouseleave', this.mouseLeaveListener);
    scrollable.addEventListener('mouseup', this.mouseUpListener);
    scrollable.addEventListener('mousemove', this.mouseMoveListener);
  }
  detachListeners() {
    const scrollable = this.scrollable?.nativeElement;
    if (scrollable) {
      scrollable.removeEventListener('mousedown', this.mouseDownListener);
      scrollable.removeEventListener('mouseleave', this.mouseLeaveListener);
      scrollable.removeEventListener('mouseup', this.mouseUpListener);
      scrollable.removeEventListener('mousemove', this.mouseMoveListener);
    }
  }
  selectKey(key: NoteName) {
    this.notesService.setRoot(key);
  }
  exitKeySelect() {
    this.showKeySelect = false;
  }
  toggleKeySelect() {
    this.showKeySelect = !this.showKeySelect;
    if (this.showKeySelect) {
      this.cdr.detectChanges();
    }
  }
  ngOnDestroy() {
    this.detachListeners();
  }
}
