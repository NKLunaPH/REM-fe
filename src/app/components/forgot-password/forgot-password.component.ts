import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;
  error = '';
  emailSent = false;
  submittedEmail = '';

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.get('email')?.markAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';

    setTimeout(() => {
      this.submittedEmail = this.forgotForm.value.email;
      this.emailSent = true;
      this.isLoading = false;
    }, 1000);
  }

  resendEmail(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  get f() {
    return this.forgotForm.controls;
  }
}
