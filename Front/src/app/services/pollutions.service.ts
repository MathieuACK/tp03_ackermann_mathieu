import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { map, delay, switchMap } from 'rxjs/operators';
import { Pollution } from '../models/pollutions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollutionsService {
  private pollutionsCache: Pollution[] = [];
  private isDataLoaded = false;

  constructor(private http: HttpClient) {}

  private fetchPollutionData(): Observable<Pollution[]> {
    if (this.isDataLoaded) {
      return of(this.pollutionsCache);
    }

    return this.http.get<Pollution[]>(environment.backendClient).pipe(
      map((data) => {
        this.pollutionsCache = [...data];
        this.isDataLoaded = true;
        return this.pollutionsCache;
      })
    );
  }

  public getPollutions(): Observable<Pollution[]> {
    return this.fetchPollutionData().pipe(delay(200));
  }

  public getPollutionById(id: number): Observable<Pollution> {
    return this.fetchPollutionData().pipe(
      delay(150),
      switchMap((pollutions) => {
        const pollution = pollutions.find((p) => p.id === id);
        if (pollution) {
          return of(pollution);
        } else {
          return throwError(
            () => new Error(`Pollution avec l'ID ${id} non trouvée`)
          );
        }
      })
    );
  }

  public addPollution(pollution: Pollution): Observable<Pollution> {
    return this.fetchPollutionData().pipe(
      delay(300),
      switchMap(() => {
        const maxId =
          this.pollutionsCache.length > 0
            ? Math.max(...this.pollutionsCache.map((p) => p.id))
            : 0;

        const newPollution = { ...pollution, id: maxId + 1 };
        this.pollutionsCache.push(newPollution);

        return of(newPollution);
      })
    );
  }

  public deletePollution(id: number): Observable<void> {
    return this.fetchPollutionData().pipe(
      delay(250),
      switchMap(() => {
        const index = this.pollutionsCache.findIndex((p) => p.id === id);
        if (index !== -1) {
          this.pollutionsCache.splice(index, 1);
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
    return this.fetchPollutionData().pipe(
      delay(300),
      switchMap(() => {
        const index = this.pollutionsCache.findIndex((p) => p.id === id);
        if (index !== -1) {
          const updatedPollution = { ...pollution, id };
          this.pollutionsCache[index] = updatedPollution;
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
