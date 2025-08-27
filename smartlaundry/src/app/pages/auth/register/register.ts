import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatOptionModule } from '@angular/material/core';

import { UserRole } from '../../../core/constants/user-roles';
import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '../../../core/constants/validation-patterns';
import { ROLE_INFO } from '../../../models/auth/role.model';
import { RegisterRequest } from '../../../models/auth/register-request.model';
import { AuthService } from '../../../services/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  hidePassword = true;
  hideConfirmPassword = true;
  roles = ROLE_INFO;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.NAME)]],
      lastName: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.NAME)]],
      email: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.EMAIL)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.PHONE)]],
      password: ['', [Validators.required, Validators.pattern(VALIDATION_PATTERNS.PASSWORD)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
      agreeToTerms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword?.hasError('passwordMismatch')) {
      delete confirmPassword.errors!['passwordMismatch'];
      if (Object.keys(confirmPassword.errors!).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return VALIDATION_MESSAGES.REQUIRED;
    }
    
    switch (fieldName) {
      case 'firstName':
      case 'lastName':
        return field?.hasError('pattern') ? VALIDATION_MESSAGES.NAME : '';
      case 'email':
        return field?.hasError('pattern') ? VALIDATION_MESSAGES.EMAIL : '';
      case 'phoneNumber':
        return field?.hasError('pattern') ? VALIDATION_MESSAGES.PHONE : '';
      case 'password':
        return field?.hasError('pattern') ? VALIDATION_MESSAGES.PASSWORD : '';
      case 'confirmPassword':
        return field?.hasError('passwordMismatch') ? 'Passwords do not match' : '';
      default:
        return '';
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    const registerData: RegisterRequest = this.registerForm.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.snackBar.open('Registration successful! Please check your email for verification.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.isLoading = false;
        const errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
