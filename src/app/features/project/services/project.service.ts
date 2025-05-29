import { Injectable } from '@angular/core';
import { Project } from '../interfaces/interfaces';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly _initialProjects: Project[] = [
    {
      id: '1',
      name: 'Project Alpha',
      description: 'This is the first project.',
      createdAt: new Date('2025-01-01'),
      mouses: [
        {
          id: '1',
          title: 'Mouse A',
          description: 'A high-quality mouse.',
          image: 'images/mouses/1.jpg',
          price: 29.99,
        },
        {
          id: '2',
          title: 'Mouse B',
          description: 'An ergonomic mouse.',
          image: 'images/mouses/2.jpg',
          price: 39.99,
        },
      ],
    },
    {
      id: '2',
      name: 'Project Beta',
      description: 'This is the second project.',
      createdAt: new Date('2025-02-02'),
      mouses: [
        {
          id: '2',
          title: 'Mouse C',
          description: 'A wireless mouse.',
          image: 'images/mouses/3.jpg',
          price: 49.99,
        },
      ],
    },
    {
      id: '3',
      name: 'Project Gamma',
      description: 'This is the third project.',
      createdAt: new Date('2025-03-03'),
      mouses: [
        {
          id: '3',
          title: 'Mouse D',
          description: 'A gaming mouse.',
          image: 'images/mouses/4.jpg',
          price: 59.99,
        },
      ],
    },
  ];
  private _projects = new BehaviorSubject<Project[]>(this._initialProjects);
  private _projects$ = this._projects.asObservable();

  public getProjects(): Observable<Project[]> {
    return of(this._projects.getValue()).pipe(delay(1000));
  }
}
