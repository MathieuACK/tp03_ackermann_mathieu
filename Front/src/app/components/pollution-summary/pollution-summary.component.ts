import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Pollution {
  title: string;
  pollutionType: string;
  description: string;
  observationDate: string;
  location: string;
  latitude: number;
  longitude: number;
  photographUrl?: string | null;
}

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

  toLabel(type: string) {
    switch (type) {
      case 'plastic':
        return 'Plastique';
      case 'chemical':
        return 'Chimique';
      case 'wild-dump':
        return 'Dépôt sauvage';
      case 'watter':
        return 'Eau';
      case 'air':
        return 'Air';
      case 'other':
        return 'Autre';
      default:
        return type;
    }
  }
}
