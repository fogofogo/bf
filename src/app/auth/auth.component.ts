import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '../shared/models';

import { Errors, UserService, JwtService, CompetitionsService } from '../shared';

@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.scss']
})
export class AuthComponent implements OnInit {
  authType: string = '';
  title: string = '';
  errors: Errors = new Errors();
  isSubmitting: boolean = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private jwtService: JwtService,
    private renderer: Renderer2,
    private service: CompetitionsService,
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

    this.renderer.addClass(document.body, 'auth');
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register' or password)
      this.authType = data[data.length - 1].path;

      this.title = this.setTitle(this.authType)

      if (this.authType === 'register') {
        this.authForm.addControl('email', new FormControl('', Validators.email));
        this.authForm.addControl('firstname', new FormControl('', Validators.required));
        this.authForm.addControl('lastname', new FormControl('', Validators.required));
        this.authForm.addControl('year', new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]));
        this.authForm.addControl('month', new FormControl('', [Validators.required, Validators.maxLength(2)]));
        this.authForm.addControl('day', new FormControl('', [Validators.required, Validators.maxLength(2)]));
        this.authForm.addControl('terms', new FormControl(true, Validators.requiredTrue));
        this.authForm.setValidators(this.minimumAge(18));
      }

      if (this.authType === 'password') {
        this.authForm.addControl('email', new FormControl('', Validators.email));
      }

    });
  }

  tempSignIn(id) {
    this.service.getTempPlayer(id).subscribe((player) => {
      this.jwtService.savePlayer(player);
      this.userService.setAuth(player);
    })
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'auth');
  }

  private minimumAge(age: number): ValidatorFn {
    return (fg: FormGroup): ValidationErrors => {
      let result: ValidationErrors = null;

      if (fg.get('year').valid && fg.get('month').valid && fg.get('day').valid) {
        const value: { year: string, month: string, day: string } = fg.value;
        const date = moment({ year: +value.year, month: (+value.month) - 1, day: +value.day }).startOf('day');

        if (date.isValid()) {
          const now = moment().startOf('day');
          const yearsDiff = date.diff(now, 'years');

          if (yearsDiff > -age) {
            result = {
              'minimumAge': {
                'requiredAge': age,
                'actualAge': yearsDiff
              }
            };
          }
        }
      }
      return result;
    };
  }

  private setTitle(authType: string): string {
    if (authType == 'login') {
      return 'Sign in';
    } else if (authType == 'register') {
      return 'Get started!';
    }
    return 'Forgot password';
  }

  public keytab(event: any, maxLength: number): void {
    let element = event.srcElement.nextElementSibling;

    if (event.target.value.length < maxLength)
      return;
    else
      element.focus();
  }

  public submitForm() {
    this.isSubmitting = true;
    this.errors;

    let credentials = this.authForm.value;
    let userRegistration = {
      dateOfBirth: credentials.day + '-' + credentials.month + '-' + credentials.year,
      email: credentials.email,
      firstname: credentials.firstname,
      lastname: credentials.lastname,
      password: credentials.password,
      username: credentials.username,
    };

    this.userService.attemptAuth(this.authType, userRegistration).subscribe(
      data => {
        if (this.authType == 'login') {
          this.jwtService.saveToken(data.accessToken);
          this.userService.populate();
          this.router.navigateByUrl('/')
        }

        if (this.authType == 'register') {
          this.router.navigateByUrl('/registration-successfull')
        }

      },
      err => {
        this.errors = err.error.reasons;
        this.isSubmitting = false;
      }
    );
  }
}
