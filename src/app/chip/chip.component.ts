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
  @Input() isSelected: boolean = false;
  @Input() onClick!: () => void;
  @Output() selectChip = new EventEmitter<string>();

  handleClick(chip: string) {
    this.selectChip.emit(chip);
  }
}
