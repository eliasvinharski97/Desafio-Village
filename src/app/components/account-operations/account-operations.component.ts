import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Account {
  id: string;
  balance: number;
  dailyWithdrawalLimit: number;
  active: boolean;
}

@Component({
  selector: 'app-account-operations',
  template: `
    <div class="card mb-4" *ngIf="account">
      <div class="card-header">
        <h2>Account Details</h2>
      </div>
      <div class="card-body">
        <p><strong>Account ID:</strong> {{account.id}}</p>
        <p><strong>Balance:</strong> {{account.balance | currency}}</p>
        <p><strong>Daily Withdrawal Limit:</strong> {{account.dailyWithdrawalLimit | currency}}</p>
        <p><strong>Status:</strong> {{account.active ? 'Active' : 'Blocked'}}</p>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        <h3>Deposit</h3>
      </div>
      <div class="card-body">
        <form [formGroup]="depositForm" (ngSubmit)="onDeposit()">
          <div class="mb-3">
            <label for="depositAmount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="depositAmount" formControlName="amount">
          </div>
          <button type="submit" class="btn btn-success" [disabled]="!depositForm.valid">Deposit</button>
        </form>
      </div>
    </div>

    <div class="card mb-4">
      <div class="card-header">
        <h3>Withdraw</h3>
      </div>
      <div class="card-body">
        <form [formGroup]="withdrawForm" (ngSubmit)="onWithdraw()">
          <div class="mb-3">
            <label for="withdrawAmount" class="form-label">Amount</label>
            <input type="number" class="form-control" id="withdrawAmount" formControlName="amount">
          </div>
          <button type="submit" class="btn btn-warning" [disabled]="!withdrawForm.valid">Withdraw</button>
        </form>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3>Account Status</h3>
      </div>
      <div class="card-body">
        <button class="btn btn-danger" (click)="toggleAccountStatus()">
          {{account?.active ? 'Block Account' : 'Activate Account'}}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class AccountOperationsComponent implements OnInit {
  account: Account | null = null;
  depositForm: FormGroup;
  withdrawForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
    this.withdrawForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit() {
    const accountId = this.route.snapshot.paramMap.get('id');
    if (accountId) {
      this.loadAccount(accountId);
    }
  }

  loadAccount(id: string) {
    this.http.get<Account>(`/api/accounts/${id}`).subscribe({
      next: (account) => {
        this.account = account;
      },
      error: (error) => {
        console.error('Error loading account:', error);
        alert('Error loading account details.');
      }
    });
  }

  onDeposit() {
    if (this.depositForm.valid && this.account) {
      this.http.post(`/api/accounts/${this.account.id}/deposit`, {
        amount: this.depositForm.value.amount
      }).subscribe({
        next: () => {
          this.loadAccount(this.account!.id);
          this.depositForm.reset();
        },
        error: (error) => {
          console.error('Error making deposit:', error);
          alert('Error making deposit. Please try again.');
        }
      });
    }
  }

  onWithdraw() {
    if (this.withdrawForm.valid && this.account) {
      this.http.post(`/api/accounts/${this.account.id}/withdraw`, {
        amount: this.withdrawForm.value.amount
      }).subscribe({
        next: () => {
          this.loadAccount(this.account!.id);
          this.withdrawForm.reset();
        },
        error: (error) => {
          console.error('Error making withdrawal:', error);
          alert('Error making withdrawal. Please try again.');
        }
      });
    }
  }

  toggleAccountStatus() {
    if (this.account) {
      const endpoint = this.account.active ? 'block' : 'activate';
      this.http.post(`/api/accounts/${this.account.id}/${endpoint}`, {}).subscribe({
        next: () => {
          this.loadAccount(this.account!.id);
        },
        error: (error) => {
          console.error('Error toggling account status:', error);
          alert('Error changing account status. Please try again.');
        }
      });
    }
  }
} 