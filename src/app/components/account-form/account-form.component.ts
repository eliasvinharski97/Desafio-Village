import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-form',
  template: `
    <div class="card">
      <div class="card-header">
        <h2>Create Account</h2>
      </div>
      <div class="card-body">
        <form [formGroup]="accountForm" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label for="id" class="form-label">Account ID</label>
            <input type="text" class="form-control" id="id" formControlName="id">
          </div>
          <div class="mb-3">
            <label for="balance" class="form-label">Initial Balance</label>
            <input type="number" class="form-control" id="balance" formControlName="balance">
          </div>
          <div class="mb-3">
            <label for="dailyWithdrawalLimit" class="form-label">Daily Withdrawal Limit</label>
            <input type="number" class="form-control" id="dailyWithdrawalLimit" formControlName="dailyWithdrawalLimit">
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!accountForm.valid">Create Account</button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class AccountFormComponent {
  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      id: ['', Validators.required],
      balance: ['', [Validators.required, Validators.min(0)]],
      dailyWithdrawalLimit: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      this.http.post('/api/accounts', this.accountForm.value)
        .subscribe({
          next: (response) => {
            console.log('Account created:', response);
            this.router.navigate(['/operations', this.accountForm.value.id]);
          },
          error: (error) => {
            console.error('Error creating account:', error);
            alert('Error creating account. Please try again.');
          }
        });
    }
  }
} 