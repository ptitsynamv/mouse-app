import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-theme-button',
  imports: [NgIf],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeButtonComponent {
  constructor(private _themeService: ThemeService) {}

  public toggleTheme(): void {
    this._themeService.toggleTheme();
  }

  public get isDarkTheme(): boolean {
    return this._themeService.isDarkTheme();
  }
}
