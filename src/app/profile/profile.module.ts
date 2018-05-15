import { NotificationsComponent } from './notifications/notifications.component';
import { AuthGuard } from './../shared/services/auth-guard.service';
import { NoAuthGuard } from './../auth/no-auth-guard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProfileComponent } from './profile.component';
import { ProfileResolver } from './profile-resolver.service';
import { SharedModule } from '../shared';
import { DetailsComponent } from './details/details.component';
import { AccessComponent } from './access/access.component';
import { HistoryComponent } from './history/history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DepositRestrictionsComponent } from './deposit-restrictions/deposit-restrictions.component';

const profileRouting: ModuleWithProviders = RouterModule.forChild([
 //canActivate: [AuthGuard],
  {
    path: 'profile',
    component: ProfileComponent,
   
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: DetailsComponent },
      { path: 'access', component: AccessComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'password', component: ChangePasswordComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'deposit-restrictions', component: DepositRestrictionsComponent },
      { path: 'notifications', component: NotificationsComponent },
    ]
  }
]);


@NgModule({
  imports: [
    profileRouting,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    ProfileComponent,
    DetailsComponent,
    AccessComponent,
    HistoryComponent,
    ChangePasswordComponent,
    TransactionsComponent,
    DepositRestrictionsComponent,
    NotificationsComponent
  ],

  providers: [
    ProfileResolver
  ]
})
export class ProfileModule { }
