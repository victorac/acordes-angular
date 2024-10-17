import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { NoteName } from '../../util/notes';
import { StringComponent } from "../string/string.component";
import { fromEvent, throttleTime } from 'rxjs';


type StringArray = {name: NoteName, stringNumber: number}[];

@Component({
  selector: 'app-arm',
  standalone: true,
  imports: [StringComponent],
  templateUrl: './arm.component.html',
  styleUrl: './arm.component.scss'
})
export class ArmComponent {
  @ViewChild('scrollable') scrollable: ElementRef | undefined;
  private isDown = false;
  private startY = 0;
  private scrollTop = 0;

  strings: StringArray = [
    {name: NoteName.E, stringNumber: 0},
    {name: NoteName.A, stringNumber: 1},
    {name: NoteName.D, stringNumber: 2},
    {name: NoteName.G, stringNumber: 3},
    {name: NoteName.B, stringNumber: 4},
    {name: NoteName.E, stringNumber: 5},
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.initializeKeySelect();
  }

  initializeKeySelect() {
    const scrollable = this.scrollable?.nativeElement;
    if (!scrollable) return;

    this.ngZone.runOutsideAngular(() => {
      fromEvent(scrollable, 'mousedown').subscribe((e:any) => {
        this.isDown = true;
        scrollable.classList.add('active');
        this.startY = e.pageY - scrollable.offsetTop;
        this.scrollTop = scrollable.scrollTop;
      });

      fromEvent(scrollable, 'mouseleave').subscribe(() => {
        this.isDown = false;
        scrollable.classList.remove('active');
      });

      fromEvent(scrollable, 'mouseup').subscribe(() => {
        this.isDown = false;
        scrollable.classList.remove('active');
      });

      fromEvent(scrollable, 'mousemove').pipe(throttleTime(16)).subscribe((e:any) => {
        if (!this.isDown) return;
        e.preventDefault();
        const y = e.pageY - scrollable.offsetTop;
        const walk = (y - this.startY) * 1.2;
        scrollable.scrollTop = this.scrollTop - walk;
      })
    })
  }
}
