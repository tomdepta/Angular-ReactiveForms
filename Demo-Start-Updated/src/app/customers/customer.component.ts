import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Customer } from './customer';

function ratingRangeValidator(c: AbstractControl): { [key: string]: boolean } {
  const value = c.value;
  return value !== undefined && (isNaN(value) || value < 1 || value > 5)
    ? { range: true }
    : null;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required]],
      phone: '',
      notification: 'email',
      rating: ['', ratingRangeValidator],
      sendCatalog: true
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  populateTestData() {
    this.customerForm.patchValue({
      firstName: 'Andrzej',
      lastName: 'Golota'
    });
  }

  setNotification(notificationMethod: string) {
    const phoneControl = this.customerForm.controls.phone;
    if (notificationMethod === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
