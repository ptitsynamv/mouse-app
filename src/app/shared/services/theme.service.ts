import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Theme } from '../interfaces/shared.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _defaultTheme: Theme = Theme.Dark;
  private readonly _themeKey: string = 'theme';

  constructor(private _localStorageService: LocalStorageService) {
    this._initTheme();
  }

  public setTheme(theme: Theme): void {
    this._localStorageService.setItem(this._themeKey, theme);
  }

  public getTheme(): Theme | null {
    return this._localStorageService.getItem(this._themeKey) as Theme | null;
  }

  public toggleTheme(): void {
    const currentTheme = this.getTheme();
    const newTheme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
    this.setTheme(newTheme);
  }

  public isDarkTheme(): boolean {
    const theme = this.getTheme();
    return theme === Theme.Dark;
  }

  public isLightTheme(): boolean {
    const theme = this.getTheme();
    return theme === Theme.Light;
  }

  private _initTheme(): void {
    const savedTheme = this.getTheme();
    if (!savedTheme) {
      this.setTheme(this._defaultTheme);
    }
  }
}
