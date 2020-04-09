import { Component, OnInit } from '@angular/core';
import { HelperService } from './../helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private helper: HelperService) { }

  isSubmitDisabled = false;

  showAlert = false;

  name = '';
  email = '';
  message = '';

  contactForm: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.required
      ])
    });
  }

  submit() {
    this.isSubmitDisabled = true;
    const { name, message } = this.contactForm.value;
    const email = this.emailFormControl.value;

    const data = { name, email, message };

    this.helper.submitContactUs(data).subscribe(_ => {
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
        this.isSubmitDisabled = false;
        this.contactForm.reset();
        this.emailFormControl.reset();
      }, 2000);

    });
  }

  isValid() {
    return this.contactForm.status !== 'INVALID' && this.emailFormControl.status !== 'INVALID';
  }

}
