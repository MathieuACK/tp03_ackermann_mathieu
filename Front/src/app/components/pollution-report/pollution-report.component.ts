import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { PollutionSummaryComponent } from '../pollution-summary/pollution-summary.component';
import { Pollution } from '../../models/pollutions';
import { PollutionsService } from '../../services/pollutions.service';

function noFutureDateValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const input = new Date(control.value);
  input.setHours(0, 0, 0, 0);
  return input > today ? { futureDate: true } : null;
}

@Component({
  selector: 'app-pollution-report',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, PollutionSummaryComponent],
  templateUrl: './pollution-report.component.html',
  styleUrls: ['./pollution-report.component.css'],
})
export class PollutionReportComponent implements OnInit {
  pollutionFormValid: boolean = false;
  pollutionFormValues: Pollution | null = null;
  submitted = false;
  nextId: number = 1;

  constructor(private pollutionsService: PollutionsService) {}

  ngOnInit(): void {
    // Récupérer l'ID maximum actuel
    this.pollutionsService.getPollutions().subscribe((pollutions) => {
      if (pollutions && pollutions.length > 0) {
        const maxId = Math.max(...pollutions.map((p) => p.id));
        this.nextId = maxId + 1;
      }
    });
  }

  pollutionForm = new FormGroup({
    title: new FormControl('', Validators.required),
    pollutionType: new FormControl('', Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    observationDate: new FormControl('', [
      Validators.required,
      noFutureDateValidator,
    ]),
    location: new FormControl('', Validators.required),
    latitude: new FormControl(null, [
      Validators.required,
      Validators.min(-90),
      Validators.max(90),
    ]),
    longitude: new FormControl(null, [
      Validators.required,
      Validators.min(-180),
      Validators.max(180),
    ]),
    photographUrl: new FormControl('', Validators.pattern('https?://.+')),
  });

  onSubmit() {
    this.submitted = true;
    if (this.pollutionForm.invalid) {
      this.pollutionForm.markAllAsTouched();
      return;
    }

    const rawFromValue = this.pollutionForm.value as any;
    this.pollutionFormValues = {
      id: this.nextId, // Utilise l'ID auto-incrémenté
      title: rawFromValue.title,
      pollutionType: rawFromValue.pollutionType,
      description: rawFromValue.description,
      observationDate: rawFromValue.observationDate,
      location: rawFromValue.location,
      latitude: Number(rawFromValue.latitude),
      longitude: Number(rawFromValue.longitude),
      photographUrl: rawFromValue.photographUrl || null,
    };
    this.pollutionFormValid = true;
    this.nextId++; // Incrémente pour la prochaine pollution
  }

  resetForm() {
    this.pollutionForm.reset();
    this.pollutionForm.markAsPristine();
    this.pollutionForm.markAsUntouched();
    this.pollutionFormValid = false;
    this.pollutionFormValues = null;
    this.submitted = false;
  }
}
