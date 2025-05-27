import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class WithdrawComponent {
  withdrawForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.withdrawForm = this.fb.group({
      accountId: ['', [Validators.required, Validators.min(1)]],
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit() {
    if (this.withdrawForm.valid) {
      const { accountId, amount } = this.withdrawForm.value;
      this.accountService.withdraw(accountId, amount).subscribe({
        next: () => {
          this.successMessage = 'Saque realizado com sucesso!';
          this.errorMessage = '';
          this.withdrawForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao realizar saque';
          this.successMessage = '';
        }
      });
    }
  }
} 