import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteName } from '../../util/notes';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input() note!: NoteName;
  @Input() index!: number;
  @Input() isSelected: boolean = false;
  @Input() onClick!: () => void;
  @Output() selectChip = new EventEmitter<NoteName>();

  handleClick(noteName: NoteName) {
    this.selectChip.emit(noteName);
  }
}
