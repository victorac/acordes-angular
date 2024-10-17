import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ChipComponent } from '../chip/chip.component';
import { NoteName, NOTES } from '../../util/notes';
import { NotesService } from '../notes.service';
import { fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-key-selector',
  standalone: true,
  imports: [ChipComponent],
  templateUrl: './key-selector.component.html',
  styleUrl: './key-selector.component.scss',
})
export class KeySelectorComponent {
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  allKeys: NoteName[] = NOTES;

  constructor(private notesService: NotesService, private ngZone: NgZone) {}

  getRoot(): NoteName {
    return this.notesService.getRoot();
  }

  selectKey(key: NoteName) {
    this.notesService.setRoot(key);
  }

  ngAfterViewChecked() {
    this.initializeKeySelect();
  }

  initializeKeySelect() {
    const scrollable = this.scrollable?.nativeElement;
    if (!scrollable) return;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(scrollable, 'mousedown').subscribe((e: any) => {
        this.isDown = true;
        scrollable.classList.add('active');
        this.startX = e.pageX - scrollable.offsetLeft;
        this.scrollLeft = scrollable.scrollLeft;
      });

      fromEvent(scrollable, 'mouseleave').subscribe(() => {
        this.isDown = false;
        scrollable.classList.remove('active');
      });

      fromEvent(scrollable, 'mouseup').subscribe(() => {
        this.isDown = false;
        scrollable.classList.remove('active');
      });

      fromEvent(scrollable, 'mousemove')
        .pipe(throttleTime(16))
        .subscribe((e: any) => {
          if (!this.isDown) return;
          e.preventDefault();
          const x = e.pageX - scrollable.offsetLeft;
          const walk = (x - this.startX) * 1.2;
          scrollable.scrollLeft = this.scrollLeft - walk;
        });
    });
  }
}
