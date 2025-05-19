import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { UserState } from './app/store/user/user.state';
import { ThemeState } from './app/store/theme/theme.state';
import { ClinicasState } from './app/state/clinica.state';
import { provideNgxMask } from 'ngx-mask';
import { TokenInterceptor } from './app/core/interceptors/token.interceptor';
import { provideStore } from '@ngxs/store';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideStore([UserState, ThemeState, ClinicasState]),
    provideNgxMask()
  ]
}).catch(err => console.error(err));
