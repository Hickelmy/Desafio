import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeService } from '../core/services/theme.service';
import { AuthService } from '../core/auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    AuthService,
    ThemeService
  ]
})
export class StateModule {}
