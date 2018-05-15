import { Component, Input } from '@angular/core';

import { Errors } from './models';

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList) {
    this.formattedErrors = [];

    if (errorList) {
      this.formattedErrors = errorList;
    }
  };

  get errorList() { return this.formattedErrors; }


}
