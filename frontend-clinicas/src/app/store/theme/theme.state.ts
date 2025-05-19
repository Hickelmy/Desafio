import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetTheme, ToggleTheme } from './theme.actions';

export interface ThemeModel {
  mode: 'light' | 'dark';
}

@State<ThemeModel>({
  name: 'theme',
  defaults: {
    mode: (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  }
})
export class ThemeState {
  @Selector()
  static mode({ mode }: ThemeModel): 'light' | 'dark' {
    return mode;
  }

  @Action(SetTheme)
  setTheme(ctx: StateContext<ThemeModel>, { mode }: SetTheme): void {
    this.applyTheme(mode);
    ctx.patchState({ mode });
  }

  @Action(ToggleTheme)
  toggleTheme(ctx: StateContext<ThemeModel>): void {
    const currentMode = ctx.getState().mode;
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    this.applyTheme(newMode);
    ctx.patchState({ mode: newMode });
  }

  private applyTheme(mode: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
  }
}
