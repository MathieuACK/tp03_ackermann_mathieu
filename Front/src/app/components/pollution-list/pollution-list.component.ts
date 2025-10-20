import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PollutionsService } from '../../services/pollutions.service';
import { Pollution } from '../../models/pollutions';

@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pollution-list.component.html',
  styleUrls: ['./pollution-list.component.css'],
})
export class PollutionListComponent implements OnInit {
  pollutions: Pollution[] = [];
  filteredPollutions: Pollution[] = [];

  titleFilter: string = '';
  typeFilter: string = '';
  locationFilter: string = '';
  dateFromFilter: string = '';
  dateToFilter: string = '';

  pollutionTypes: string[] = [
    'Plastique',
    'Chimique',
    'Dépôt sauvage',
    'Eau',
    'Air',
    'Autre',
  ];

  constructor(
    private pollutionsService: PollutionsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPollutions();
  }

  loadPollutions(): void {
    this.pollutionsService.getPollutions().subscribe({
      next: (data) => {
        this.pollutions = data;
        this.filteredPollutions = [...data];
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pollutions:', err);
      },
    });
  }

  applyFilters(): void {
    this.filteredPollutions = this.pollutions.filter((pollution) => {
      const matchesTitle =
        !this.titleFilter ||
        pollution.title.toLowerCase().includes(this.titleFilter.toLowerCase());

      const matchesType =
        !this.typeFilter || pollution.pollutionType === this.typeFilter;

      const matchesLocation =
        !this.locationFilter ||
        pollution.location
          .toLowerCase()
          .includes(this.locationFilter.toLowerCase());

      const matchesDateFrom =
        !this.dateFromFilter ||
        new Date(pollution.observationDate) >= new Date(this.dateFromFilter);

      const matchesDateTo =
        !this.dateToFilter ||
        new Date(pollution.observationDate) <= new Date(this.dateToFilter);

      return (
        matchesTitle &&
        matchesType &&
        matchesLocation &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }

  resetFilters(): void {
    this.titleFilter = '';
    this.typeFilter = '';
    this.locationFilter = '';
    this.dateFromFilter = '';
    this.dateToFilter = '';
    this.filteredPollutions = [...this.pollutions];
  }

  deletePollution(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionsService.deletePollution(id).subscribe({
        next: () => {
          this.pollutions = this.pollutions.filter((p) => p.id !== id);
          this.applyFilters();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Erreur lors de la suppression de la pollution');
        },
      });
    }
  }

  viewDetail(id: number): void {
    this.router.navigate(['/pollution', id]);
  }
}
