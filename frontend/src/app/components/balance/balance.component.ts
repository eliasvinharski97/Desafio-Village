import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class BalanceComponent {
  balanceForm: FormGroup;
  errorMessage = '';
  balance: number | null = null;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.balanceForm = this.fb.group({
      accountId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.balanceForm.valid) {
      const { accountId } = this.balanceForm.value;
      this.accountService.getBalance(accountId).subscribe({
        next: (balance) => {
          this.balance = balance;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao consultar saldo';
          this.balance = null;
        }
      });
    }
  }
} 