import { PipeModule } from './pipes/pipes.module';
import { CompetitionDetailsComponent } from './../competitions/shared/competition-details/competition-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { ListErrorsComponent } from './list-errors.component';
import { ShowAuthedDirective } from './show-authed.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
     HttpClientModule,
     PipeModule.forRoot()
  ],
  declarations: [
    ListErrorsComponent,
    CompetitionDetailsComponent,
    ShowAuthedDirective,
    ModalComponent,
    CountDownComponent,
  ],
  exports: [
    CompetitionDetailsComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListErrorsComponent,
    RouterModule,
    ShowAuthedDirective,
    ModalComponent,
    CountDownComponent,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
