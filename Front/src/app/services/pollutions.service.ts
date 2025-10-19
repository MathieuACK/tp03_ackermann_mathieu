import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Pollution } from '../models/pollutions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PollutionsService {
  constructor(private http: HttpClient) {}

  public getPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(environment.backendClient);
  }

  public getPollutionById(id: number): Observable<Pollution> {
    return this.http.get<Pollution>(`${environment.backendClient}/${id}`);
  }

  public addPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(environment.backendClient, pollution);
  }

  public deletePollution(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendClient}/${id}`);
  }

  public updatePollution(
    id: number,
    pollution: Pollution
  ): Observable<Pollution> {
    return this.http.put<Pollution>(
      `${environment.backendClient}/${id}`,
      pollution
    );
  }
}
