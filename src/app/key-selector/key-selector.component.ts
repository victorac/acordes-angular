import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';
import { NoteName, NOTES } from '../../util/notes';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-key-selector',
  standalone: true,
  imports: [ChipComponent],
  templateUrl: './key-selector.component.html',
  styleUrl: './key-selector.component.scss',
})
export class KeySelectorComponent {
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  private mouseDownListener: any;
  private mouseLeaveListener: any;
  private mouseUpListener: any;
  private mouseMoveListener: any;
  private keySelectInitialized = false;
  allKeys: NoteName[] = NOTES;

  constructor(private notesService: NotesService) {}

  getRoot(): NoteName {
    return this.notesService.getRoot();
  }

  selectKey(key: NoteName) {
    this.notesService.setRoot(key);
  }

  ngAfterViewChecked() {
    if (!this.keySelectInitialized) {
      this.initializeKeySelect();
      this.keySelectInitialized = true;
    }
  }

  initializeKeySelect() {
    const scrollable = this.scrollable?.nativeElement;
    console.log(scrollable);
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    this.mouseDownListener = (e: { pageX: number }) => {
      console.log('mouseDownListener');
      isDown = true;
      scrollable.classList.add('active');
      startX = e.pageX - scrollable.offsetLeft;
      scrollLeft = scrollable.scrollLeft;
    };

    this.mouseLeaveListener = () => {
      console.log('mouseLeaveListener');
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
  ngOnDestroy() {
    this.detachListeners();
  }
}
