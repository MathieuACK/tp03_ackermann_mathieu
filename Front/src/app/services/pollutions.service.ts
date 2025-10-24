import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollutions';
import { environment } from '../../environments/environment';
import { somePollutions } from '../data/pollutions';

@Injectable({
  providedIn: 'root',
})
export class PollutionsService {
  private existingPollutions: Pollution[] = somePollutions;

  constructor(private http: HttpClient) {}

  private fetchPollutionData(): Observable<Pollution[]> {
    return of(this.existingPollutions);
  }

  public getPollutions(): Observable<Pollution[]> {
    return of(this.existingPollutions);
  }

  public getPollutionById(id: number): Observable<Pollution> {
    return of(this.existingPollutions).pipe(
      delay(200),
      map((pollutions) => {
        const pollution = pollutions.find((p) => p.id === id);
        if (pollution) {
          return pollution;
        } else {
          throw new Error(`Pollution avec l'ID ${id} non trouvée`);
        }
      })
    );
  }

  public addPollution(pollution: Pollution): Observable<Pollution> {
    return of(this.existingPollutions).pipe(
      delay(300),
      switchMap(() => {
        const maxId =
          this.existingPollutions.length > 0
            ? Math.max(...this.existingPollutions.map((p) => p.id))
            : 0;

        const newPollution = { ...pollution, id: maxId + 1 };
        this.existingPollutions.push(newPollution);

        return of(newPollution);
      })
    );
  }

  public deletePollution(id: number): Observable<void> {
    return of(this.fetchPollutionData()).pipe(
      delay(250),
      switchMap(() => {
        const index = this.existingPollutions.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.existingPollutions.splice(index, 1);
          return of(void 0);
        } else {
          return throwError(
            () =>
              new Error(
                `Pollution avec l'ID ${id} non trouvée pour suppression`
              )
          );
        }
      })
    );
  }

  public updatePollution(
    id: number,
    pollution: Pollution
  ): Observable<Pollution> {
    return of(this.existingPollutions).pipe(
      delay(300),
      switchMap(() => {
        const index = this.existingPollutions.findIndex((p) => p.id === id);
        if (index !== -1) {
          const updatedPollution = { ...pollution, id };
          this.existingPollutions[index] = updatedPollution;
          return of(updatedPollution);
        } else {
          return throwError(
            () =>
              new Error(
                `Pollution avec l'ID ${id} non trouvée pour mise à jour`
              )
          );
        }
      })
    );
  }
}
