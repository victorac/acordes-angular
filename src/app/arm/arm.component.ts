import { Component } from '@angular/core';
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
  strings: NoteName[] = [NoteName.E, NoteName.A, NoteName.D, NoteName.G, NoteName.B, NoteName.E];


}
