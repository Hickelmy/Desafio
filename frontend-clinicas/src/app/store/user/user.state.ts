import { Selector, State, StateContext, Action } from '@ngxs/store';
import { SetUser, ClearUser } from './user.actions';

export interface UserStateModel {
  id: string;
  name: string;
  email: string;
  avatarBase64: string;
  avatarUrl: string;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    id: '',
    name: '',
    email: '',
    avatarBase64: '',
    avatarUrl: ''
  }
})
export class UserState {
  @Selector() static id(state: UserStateModel): string {
    return state.id;
  }

  @Selector() static name(state: UserStateModel): string {
    return state.name;
  }

  @Selector() static email(state: UserStateModel): string {
    return state.email;
  }

  @Selector() static avatarUrl(state: UserStateModel): string {
    return state.avatarUrl;
  }

  @Action(SetUser)
  setUser(ctx: StateContext<UserStateModel>, action: SetUser) {
    const state = ctx.getState();
    const avatarBase64 = action.avatar ?? '';

    let avatarUrl = state.avatarUrl;
    if (avatarBase64 && avatarBase64 !== state.avatarBase64) {
      avatarUrl = this.base64ToUrl(avatarBase64);
    }

    ctx.setState({
      id: action.id,
      name: action.name,
      email: action.email,
      avatarBase64,
      avatarUrl
    });
  }

  @Action(ClearUser)
  clearUser(ctx: StateContext<UserStateModel>) {
    ctx.setState({
      id: '',
      name: '',
      email: '',
      avatarBase64: '',
      avatarUrl: ''
    });
  }

  private base64ToUrl(base64: string): string {
    const parts = base64.split(',');
    const mime = parts[0]?.match(/:(.*?);/)?.[1] || 'image/jpeg';
    const byteStr = atob(parts[1] || '');
    const len = byteStr.length;
    const u8arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8arr[i] = byteStr.charCodeAt(i);
    }
    const blob = new Blob([u8arr], { type: mime });
    return URL.createObjectURL(blob);
  }
}
