import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent {}
