import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public loading = false;
  constructor (
    private userService: UserService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.userService.populate();
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}

