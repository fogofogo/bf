import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
   {
    path: 'password',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
   {
    path: 'registration-successfull',
    component: RegistrationSuccessComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule
  ],
  declarations: [
    AuthComponent,
    RegistrationSuccessComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}
