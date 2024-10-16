import { Component, ElementRef, ViewChild } from '@angular/core';
import { NoteName } from '../../util/notes';
import { StringComponent } from "../string/string.component";

@Component({
  selector: 'app-arm',
  standalone: true,
  imports: [StringComponent],
  templateUrl: './arm.component.html',
  styleUrl: './arm.component.scss'
})
export class ArmComponent {
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  private mouseDownListener: any;
  private mouseLeaveListener: any;
  private mouseUpListener: any;
  private mouseMoveListener: any;
  private keySelectInitialized = false;
  strings: NoteName[] = [NoteName.E, NoteName.A, NoteName.D, NoteName.G, NoteName.B, NoteName.E];

  ngAfterViewChecked() {
    if (!this.keySelectInitialized) {
      this.initializeKeySelect();
      this.keySelectInitialized = true;
    }
  }

  initializeKeySelect() {
    const scrollable = this.scrollable?.nativeElement;
    let isDown = false;
    let startY: number;
    let scrollTop: number;

    this.mouseDownListener = (e: { pageY: number }) => {
      isDown = true;
      scrollable.classList.add('active');
      startY = e.pageY - scrollable.offsetTop;
      scrollTop = scrollable.scrollTop;
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
      pageY: number;
    }) => {
      if (!isDown) return;
      e.preventDefault();
      const y = e.pageY - scrollable.offsetTop;
      const walk = (y - startY) * 1.2; //scroll-fast
      scrollable.scrollTop = scrollTop - walk;
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
