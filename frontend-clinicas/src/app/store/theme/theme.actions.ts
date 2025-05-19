export class SetTheme {
  static readonly type = '[Theme] Set';
  constructor(public mode: 'light' | 'dark') {}
}

export class ToggleTheme {
  static readonly type = '[Theme] Toggle';
}
