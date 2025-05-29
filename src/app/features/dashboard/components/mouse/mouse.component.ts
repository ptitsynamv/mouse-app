import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Mouse } from '../../store/dashboard.store';

@Component({
  selector: 'app-mouse',
  standalone: false,
  templateUrl: './mouse.component.html',
  styleUrl: './mouse.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseComponent {
  @Input() public mouse: Mouse | null = null;
  @Input() public isLoading: boolean = false;

  @Output() public removeMouse = new EventEmitter<string>();

  public deleteMouse(id: string): void {
    this.removeMouse.emit(id);
  }
}
