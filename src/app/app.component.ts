import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'acordes';
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  ngAfterViewInit() {
    const scrollable = this.scrollable?.nativeElement;
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    scrollable.addEventListener('mousedown', (e: { pageX: number; }) => {
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

    scrollable.addEventListener('mousemove', (e: { preventDefault: () => void; pageX: number; }) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollable.offsetLeft;
      const walk = (x - startX) * 3; //scroll-fast
      scrollable.scrollLeft = scrollLeft - walk;
    });
  }
}
