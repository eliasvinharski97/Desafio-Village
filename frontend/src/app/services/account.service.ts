import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Account, Transaction, AccountStatement, StatementFilter } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = '/api/contas';
  private pessoaUrl = '/api/pessoas';

  constructor(private http: HttpClient) {}

  validatePerson(idPessoa: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.pessoaUrl}/${idPessoa}/validar`);
  }

  createAccount(account: Account): Observable<Account> {
    console.log('Service - Enviando dados:', account);
    return this.http.post<Account>(this.apiUrl, account);
  }

  getAccount(accountId: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${accountId}`);
  }

  getBalance(accountId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${accountId}/saldo`);
  }

  deposit(accountId: number, amount: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${accountId}/depositar`, { valor: amount });
  }

  withdraw(accountId: number, amount: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${accountId}/sacar`, { valor: amount });
  }

  toggleBlock(accountId: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${accountId}/bloquear`, {});
  }

  getStatement(id: number): Observable<AccountStatement> {
    return this.http.get<AccountStatement>(`${this.apiUrl}/contas/${id}/statement`);
  }

  getStatementByPeriod(id: number, filter: StatementFilter): Observable<AccountStatement> {
    const params = new URLSearchParams();
    if (filter.startDate) {
      params.append('startDate', filter.startDate.toISOString());
    }
    if (filter.endDate) {
      params.append('endDate', filter.endDate.toISOString());
    }
    return this.http.get<AccountStatement>(`${this.apiUrl}/contas/${id}/statement?${params}`);
  }

  getTransactions(accountId: number, startDate?: string, endDate?: string): Observable<Transaction[]> {
    let url = `${this.apiUrl}/${accountId}/extrato`;
    if (startDate && endDate) {
      url += `?dataInicio=${startDate}&dataFim=${endDate}`;
    }
    return this.http.get<Transaction[]>(url);
  }
} 