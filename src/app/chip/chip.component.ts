import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() note!: string;
  @Input() index!: number;
  @Input() isSelected: boolean = false;
  @Input() onClick!: () => void;
  @Output() selectChip = new EventEmitter<number>();

  handleClick(noteIndex: number) {
    this.selectChip.emit(noteIndex);
  }
}
