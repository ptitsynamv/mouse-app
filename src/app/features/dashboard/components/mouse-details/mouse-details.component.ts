import { Component, inject, OnInit } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-mouse-details',
  standalone: false,
  templateUrl: './mouse-details.component.html',
  styleUrl: './mouse-details.component.scss',
  providers: [DashboardStore],
})
export class MouseDetailsComponent implements OnInit {
  public readonly store = inject(DashboardStore);

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.store.loadMouseById(id);
    });
  }
}
