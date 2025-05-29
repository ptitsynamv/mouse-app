import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Team } from '../store/team.store';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly _initialTeams: Team[] = [
    {
      id: '1',
      name: 'Team A',
      members: ['Alice', 'Bob'],
      yearFounded: 2010,
    },
    {
      id: '2',
      name: 'Team B',
      members: ['Charlie', 'David'],
      yearFounded: 2015,
    },
    {
      id: '3',
      name: 'Team C',
      members: ['Eve', 'Frank'],
      yearFounded: 2020,
    },
  ];
  private _teams = new BehaviorSubject<Team[]>(this._initialTeams);
  private _teams$ = this._teams.asObservable();

  public getTeams(): Observable<Team[]> {
    return of(this._teams.getValue()).pipe(delay(1000));
  }
}
