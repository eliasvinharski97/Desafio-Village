import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { Account, Transaction, AccountStatement } from '../../models/account.model';

@Component({
  selector: 'app-account-operations',
  templateUrl: './account-operations.component.html',
  styleUrls: ['./account-operations.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AccountOperationsComponent implements OnInit {
  accountId: number = 0;
  account: Account | null = null;
  transactions: Transaction[] = [];
  operationForm: FormGroup;
  filterForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  statement: AccountStatement | null = null;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private fb: FormBuilder
  ) {
    this.operationForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(0.01)]]
    });

    this.filterForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.accountId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAccountDetails();
    this.loadTransactions();
  }

  loadAccountDetails() {
    this.accountService.getAccount(this.accountId).subscribe({
      next: (data) => {
        this.account = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar detalhes da conta.';
      }
    });
  }

  loadTransactions(startDate?: string, endDate?: string) {
    this.accountService.getTransactions(this.accountId, startDate, endDate).subscribe({
      next: (data) => {
        this.transactions = data;
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar transações.';
      }
    });
  }

  deposit() {
    if (this.operationForm.valid) {
      this.accountService.deposit(this.accountId, this.operationForm.value.valor).subscribe({
        next: () => {
          this.successMessage = 'Depósito realizado com sucesso!';
          this.errorMessage = '';
          this.operationForm.reset();
          this.loadAccountDetails();
          this.loadTransactions();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao realizar depósito.';
          this.successMessage = '';
        }
      });
    }
  }

  withdraw() {
    if (this.operationForm.valid) {
      this.accountService.withdraw(this.accountId, this.operationForm.value.valor).subscribe({
        next: () => {
          this.successMessage = 'Saque realizado com sucesso!';
          this.errorMessage = '';
          this.operationForm.reset();
          this.loadAccountDetails();
          this.loadTransactions();
        },
        error: (error) => {
          this.errorMessage = 'Erro ao realizar saque.';
          this.successMessage = '';
        }
      });
    }
  }

  toggleBlock() {
    this.accountService.toggleBlock(this.accountId).subscribe({
      next: () => {
        this.successMessage = 'Status da conta atualizado com sucesso!';
        this.errorMessage = '';
        this.loadAccountDetails();
      },
      error: (error) => {
        this.errorMessage = 'Erro ao atualizar status da conta.';
        this.successMessage = '';
      }
    });
  }

  filterTransactions() {
    if (this.filterForm.valid) {
      const { startDate, endDate } = this.filterForm.value;
      this.loadTransactions(startDate, endDate);
    }
  }

  loadStatement(id: number, filter?: { startDate?: Date; endDate?: Date }) {
    const request = filter 
      ? this.accountService.getStatementByPeriod(id, filter)
      : this.accountService.getStatement(id);

    request.subscribe({
      next: (statement) => {
        this.statement = statement;
      },
      error: (error) => {
        console.error('Erro ao carregar extrato:', error);
        alert('Erro ao carregar extrato da conta.');
      }
    });
  }
} 