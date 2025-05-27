import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class DepositComponent {
  depositForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.depositForm = this.fb.group({
      accountId: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.depositForm.valid) {
      const { accountId, amount } = this.depositForm.value;
      this.accountService.deposit(accountId, amount).subscribe({
        next: () => {
          this.successMessage = 'Depósito realizado com sucesso!';
          this.errorMessage = '';
          this.depositForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao realizar depósito';
          this.successMessage = '';
        }
      });
    }
  }
} 