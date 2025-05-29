import { Injectable } from '@angular/core';
import { Mouse } from '../store/dashboard.store';
import { delay, filter, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private _mouses: Mouse[] = [
    {
      id: '1',
      title: 'first mouse',
      description: 'This is the first mouse',
      image: 'images/mouses/1.jpg',
      price: 29.99,
    },
    {
      id: '2',
      title: 'second mouse',
      description: 'This is the second mouse',
      image: 'images/mouses/2.jpg',
      price: 39.99,
    },
    {
      id: '3',
      title: 'third mouse',
      description: 'This is the third mouse',
      image: 'images/mouses/3.jpg',
      price: 49.99,
    },
  ];

  public getMouses(): Observable<Mouse[]> {
    return of(this._mouses).pipe(delay(1000));
  }

  public addMouse(): Observable<Mouse> {
    const newMouse: Mouse = {
      id: crypto.randomUUID(),
      title: 'New Mouse',
      description: 'Description',
      image: 'images/mouses/4.jpg',
      price: 0,
    };

    this._mouses.push(newMouse);
    return of(newMouse).pipe(delay(1000));
  }

  public removeMouse(id: string): Observable<Mouse[]> {
    return of(this._mouses).pipe(
      map((mouses) => mouses.filter((mouse) => mouse.id !== id)),
      delay(1000),
    );
  }

  public getMouseById(id: string): Observable<Mouse | null> {
    return of(this._mouses).pipe(
      map((mouses) => mouses.find((mouse) => mouse.id === id) || null),
      delay(1000),
    );
  }
}
