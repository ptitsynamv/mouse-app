import { Component } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public isMenuOpen = signal(false);

  public menuToggle() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
