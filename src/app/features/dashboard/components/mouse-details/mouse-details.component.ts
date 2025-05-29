import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MainStore } from '../../../../store/main.store';

@Component({
  selector: 'app-mouse-details',
  standalone: false,
  templateUrl: './mouse-details.component.html',
  styleUrl: './mouse-details.component.scss',
  providers: [MainStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseDetailsComponent implements OnInit {
  public readonly store = inject(MainStore);

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.store.loadMouseById(id);
    });
  }
}
