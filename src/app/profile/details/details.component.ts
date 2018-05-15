import { ApiService } from './../../shared/services/api.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { User } from './../../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService, Errors } from "../../shared/";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  errors: Errors = new Errors();
  editPhone: boolean = false;
  editAddress: boolean = false;
  formPhoneNumber: FormGroup;
  formAddress: FormGroup;

  constructor(private userService: UserService, private toastyService: ToastyService, private fb: FormBuilder) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
      }
    )
     this.formPhoneNumber = this.fb.group({  
      'phoneNumber': [this.currentUser.phoneNumber, Validators.required]  
    }); 

    //TODO: Enable when pointing at real ApiService

    // this.formAddress = this.fb.group({ 
    //   'lineOne': [this.currentUser.address.lineOne, Validators.required],
    //   'lineTwo': [this.currentUser.address.lineTwo],
    //   'lineThree': [this.currentUser.address.lineThree],
    //   'city': [this.currentUser.address.city, Validators.required],
    //   'country': [this.currentUser.address.country, Validators.required],
    //   'postcode': [this.currentUser.address.postcode]  
    // }); 

  }

   public updatePhoneNumber(form: any): void {  
    this.userService.updatePhoneNumber(form).subscribe(
      data => {
        this.editPhone = false;
        this.currentUser.phoneNumber = form.phoneNumber;
        this.errors = null;
        this.toastyService.default('Phone number updated');
      },
      err => {
        this.errors;
        this.errors = err.error.reasons;
      }
    );
  }

    public updateAddress(formAddress: any): void {  
    this.userService.updateAddress(formAddress).subscribe(
      data => {
        this.editAddress = false;
        this.currentUser.address = formAddress;
        this.errors = null;
        this.toastyService.default('Address updated');
      },
      err => {
        this.errors;
        this.errors = err.error.reasons;
      }
    );
  }

}
