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
        image: 'images/mouses/1.jpg',
        price: 29.99,
      },
      {
        id: crypto.randomUUID(),
        title: 'second mouse',
        description: 'This is the second mouse',
        image: 'images/mouses/2.jpg',
        price: 39.99,
      },
      {
        id: crypto.randomUUID(),
        title: 'third mouse',
        description: 'This is the third mouse',
        image: 'images/mouses/3.jpg',
        price: 49.99,
      },
    ]).pipe(delay(1000));
  }

  public addMouse(): Observable<Mouse> {
    return of({
      id: crypto.randomUUID(),
      title: 'New Mouse',
      description: 'Description',
      image: 'images/mouses/4.jpg',
      price: 0,
    }).pipe(delay(1000));
  }

  public removeMouse(id: string): Observable<void> {
    return of(undefined).pipe(delay(1000));
  }
}
