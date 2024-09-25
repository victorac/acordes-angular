import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-case',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './case.component.html',
  styleUrl: './case.component.scss',
})
export class CaseComponent {
  @Input() note!: string|undefined;
  @Input() step!: string|undefined;
  @Input() stringNumber!: number;
}
