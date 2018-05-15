import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LiveTestComponent } from './live-test.component';

import { SharedModule } from '../shared';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'live-test/:fixtureId',
    component: LiveTestComponent,
  }
]);

@NgModule({
  imports: [
    homeRouting,
    SharedModule
  ],
  declarations: [
    LiveTestComponent
  ],
})
export class LiveTestModule {}
