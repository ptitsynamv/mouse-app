import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { ThemeButtonComponent } from '../../../shared/components/theme-button/theme-button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [ThemeButtonComponent, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  public isMenuOpen = signal(false);

  public menuToggle() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
