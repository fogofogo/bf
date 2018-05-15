import { DropdownModule } from "ngx-dropdown";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { CompetitionsModule } from './competitions/competitions.module';

import { ToastyModule } from 'ng2-toasty';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MessageComponent } from './message/message.component';
import { LiveTestModule } from "./live-test/live-test.module";

import {
  ApiService,
  AuthGuard,
  FooterComponent,
  HeaderComponent,
  JwtService,
  ProfilesService,
  CompetitionsService,
  BetService,
  SharedModule,
  UserService,
  MessageService,
  LiveOddsService,
  LiveMessageService,
  WebsocketService
} from './shared';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const rootRouting: ModuleWithProviders = RouterModule.forRoot([],{useHash: true});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    LiveTestModule,
    DropdownModule,
    ProfileModule,
    CompetitionsModule,
    LoadingModule,
    rootRouting,
    
    ToastyModule.forRoot(),
    SharedModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ApiService,
    AuthGuard,
    JwtService,
    ProfilesService,
    CompetitionsService,
    BetService,
    UserService,
    MessageService,
  LiveOddsService,
  LiveMessageService,
  WebsocketService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
