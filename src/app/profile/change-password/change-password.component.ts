import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService, Errors } from "../../shared/index";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  errors: Errors = new Errors();
  formChangePassword: FormGroup;

  constructor(private userService: UserService, private toastyService: ToastyService, private fb: FormBuilder) { }

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )

    this.formChangePassword = this.fb.group({
      'previousPassword': ['', Validators.required],
      'proposedPassword': ['', Validators.required]
    });
  }

  public changePassword(form: any): void {
    this.userService.changePassword(form).subscribe(
      data => {
        this.errors = null;
        this.toastyService.default('Password updated');
      },
      err => {
        this.errors;
        this.errors = err.error.reasons;
      }
    );
  }

}
