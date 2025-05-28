import { Injectable } from '@angular/core';
import { Mouse } from '../store/dashboard.store';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public getMouses(): Observable<Mouse[]> {
    return of([
      {
        id: crypto.randomUUID(),
        title: 'first mouse',
        description: 'This is the first mouse',
        image: 'https://example.com/mouse1.jpg',
        price: 29.99,
      },
      {
        id: crypto.randomUUID(),
        title: 'second mouse',
        description: 'This is the second mouse',
        image: 'https://example.com/mouse2.jpg',
        price: 39.99,
      },
      {
        id: crypto.randomUUID(),
        title: 'third mouse',
        description: 'This is the third mouse',
        image: 'https://example.com/mouse3.jpg',
        price: 49.99,
      },
    ]).pipe(delay(1000));
  }

  public addMouse(mouse: Mouse): Observable<Mouse> {
    return of(mouse).pipe(delay(1000));
  }

  public removeMouse(id: string): Observable<void> {
    return of(undefined).pipe(delay(1000));
  }
}
