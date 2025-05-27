import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RouterModule } from '@angular/router';
import { Transaction } from '../../models/account.model';

@Component({
  selector: 'app-statement',
  templateUrl: './statement.component.html',
  styleUrls: ['./statement.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class StatementComponent {
  statementForm: FormGroup;
  errorMessage = '';
  transactions: Transaction[] = [];
  showTransactions = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.statementForm = this.fb.group({
      accountId: ['', [Validators.required, Validators.min(1)]],
      startDate: [''],
      endDate: ['']
    });
  }

  onSubmit() {
    if (this.statementForm.valid) {
      const { accountId, startDate, endDate } = this.statementForm.value;
      
      this.accountService.getTransactions(accountId, startDate, endDate).subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.showTransactions = true;
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao consultar extrato';
          this.showTransactions = false;
        }
      });
    }
  }
} 