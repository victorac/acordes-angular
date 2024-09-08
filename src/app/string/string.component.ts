import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Cell = { case: number; note: string; type: string } | undefined;

@Component({
  selector: 'app-string',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './string.component.html',
  styleUrl: './string.component.scss',
})
export class StringComponent {
  @Input({ required: true }) index!: number;
  @Input({ required: true }) cases!: number;
  @Input() cell: Cell;
  cellArray: Cell[] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.cases; i++) {
      this.cellArray.push({
        case: i,
        note: '',
        type: '',
      });
    }
    console.log(this.cell);
    if (this.cell) {
      this.cellArray[this.cell.case] = this.cell;
    }
    console.log(this.cellArray);
  }
}
