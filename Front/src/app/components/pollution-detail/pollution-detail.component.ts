import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PollutionsService } from '../../services/pollutions.service';
import { Pollution } from '../../models/pollutions';

@Component({
  selector: 'app-pollution-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pollution-detail.component.html',
  styleUrl: './pollution-detail.component.css',
})
export class PollutionDetailComponent implements OnInit {
  pollution: Pollution | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollutionsService: PollutionsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPollution(Number(id));
    } else {
      this.error = 'ID de pollution invalide';
      this.loading = false;
    }
  }

  loadPollution(id: number): void {
    this.pollutionsService.getPollutionById(id).subscribe({
      next: (data) => {
        this.pollution = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la pollution:', err);
        this.error = 'Impossible de charger les détails de cette pollution';
        this.loading = false;
      },
    });
  }

  deletePollution(): void {
    if (!this.pollution) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer cette pollution ?')) {
      this.pollutionsService.deletePollution(this.pollution.id).subscribe({
        next: () => {
          alert('Pollution supprimée avec succès');
          this.router.navigate(['/list']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          alert('Erreur lors de la suppression de la pollution');
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/list']);
  }

  openMap(): void {
    if (this.pollution) {
      const url = `https://www.google.com/maps?q=${this.pollution.latitude},${this.pollution.longitude}`;
      window.open(url, '_blank');
    }
  }
}
