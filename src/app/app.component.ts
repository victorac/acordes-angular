import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringComponent } from './string/string.component';
import { ChipComponent } from './chip/chip.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StringComponent, ChipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'acordes';
  selectedKey = 'C';
  notes = [
    'C',
    'C#-Db',
    'D',
    'D#-Eb',
    'E',
    'F',
    'F#-Gb',
    'G',
    'G#-Ab',
    'A',
    'A#-Bb',
    'B',
  ];
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  ngAfterViewInit() {
    const scrollable = this.scrollable?.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    scrollable.addEventListener('mousedown', (e: { pageX: number }) => {
      isDown = true;
      scrollable.classList.add('active');
      startX = e.pageX - scrollable.offsetLeft;
      scrollLeft = scrollable.scrollLeft;
    });

    scrollable.addEventListener('mouseleave', () => {
      isDown = false;
      scrollable.classList.remove('active');
    });

    scrollable.addEventListener('mouseup', () => {
      isDown = false;
      scrollable.classList.remove('active');
    });

    scrollable.addEventListener(
      'mousemove',
      (e: { preventDefault: () => void; pageX: number }) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollable.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        scrollable.scrollLeft = scrollLeft - walk;
      }
    );
  }
  selectKey(key: string) {
    this.selectedKey = key;
  }
}
