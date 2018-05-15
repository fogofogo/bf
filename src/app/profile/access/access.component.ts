import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService, Errors } from "../../shared/index";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  constructor(private userService: UserService, private toastyService: ToastyService, private fb: FormBuilder) { }

  errors: Errors = new Errors();
  formSetTimeOut: FormGroup;

  timeOutDurations: any[] = [
    "one-day",
    "two-days",
    "three-days",
    "seven-days",
    "one-month"
  ]


  ngOnInit() {
    this.formSetTimeOut = this.fb.group({
      'selectTimeOutPeriod': ['None', Validators.required],
    });
  }


  setTimeOut(time: string): void {
    this.toastyService.default('Time out set for ' + time);
  }

}
