import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService, Errors } from "../../shared/index";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-deposit-restrictions',
  templateUrl: './deposit-restrictions.component.html',
  styleUrls: ['./deposit-restrictions.component.scss']
})
export class DepositRestrictionsComponent implements OnInit {

  constructor(private userService: UserService, private toastyService: ToastyService, private fb: FormBuilder) { }

   errors: Errors = new Errors();
    formDepositRestrictionDurations: FormGroup;

  depositRestrictionDurations: any[] = [
    "one-day",
    "one-week",
    "one-month"
  ]

  ngOnInit() {
      this.formDepositRestrictionDurations = this.fb.group({
      'one-day': ['0'],
      'one-week': ['0'],
      'one-month': ['0'],
    });
  }

  public setDepositRestriction(form: any): void {
    this.toastyService.default('Deposit restriction set');
  }

}
