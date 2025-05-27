import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountOperation } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) { }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/${id}`);
  }

  deposit(id: number, operation: AccountOperation): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/${id}/deposit?valor=${operation.valor}`, {});
  }

  withdraw(id: number, operation: AccountOperation): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/${id}/withdraw?valor=${operation.valor}`, {});
  }

  blockAccount(id: number): Observable<Account> {
    return this.http.patch<Account>(`${this.apiUrl}/${id}/block`, {});
  }

  getBalance(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/balance`);
  }
} 