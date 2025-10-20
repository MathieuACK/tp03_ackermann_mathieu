import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pollution } from '../../models/pollutions';

@Component({
  selector: 'app-pollution-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pollution-summary.component.html',
  styleUrls: ['./pollution-summary.component.css'],
})
export class PollutionSummaryComponent {
  @Input() pollutionFormValues!: Pollution | null;
  @Output() reset = new EventEmitter<void>();
}
