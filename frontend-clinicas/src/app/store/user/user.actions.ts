export class SetUser {
  static readonly type = '[User] Set';
  constructor(
    public name: string,
    public avatar: string | undefined,
    public email: string,
    public id: string
  ) {}
}


export class ClearUser {
  static readonly type = '[User] Clear';
}
