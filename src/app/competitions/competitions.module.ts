

import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'ngx-loading';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CompetitionsComponent } from './competitions.component';
import { CompetitionsAuthResolver } from './competitions-auth-resolver.service';
import { SportFilterPipe } from '../shared/pipes/sport-filter-pipe';
import { SharedModule} from '../shared';
import { ArraySortPipe } from '../shared/pipes/orderby.pipe';
import { OrderModule } from 'ngx-order-pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'competitions',
    pathMatch: 'full',
    component: CompetitionsComponent,
    resolve: {
      isAuthenticated: CompetitionsAuthResolver
    },
  }
]);


@NgModule({
  imports: [
    homeRouting,
    SharedModule,
    LoadingModule,
    TranslateModule,
    OrderModule
  ],
  declarations: [
    CompetitionsComponent,
    SportFilterPipe,
    ArraySortPipe
  ],
  providers: [
    CompetitionsAuthResolver
  ],

})
export class CompetitionsModule {}
