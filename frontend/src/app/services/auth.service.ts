import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface UserInfo {
  idPessoa: number;
  idConta: number;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(this.getUserFromStorage());
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {}

  private getUserFromStorage(): UserInfo | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  public get currentUserValue(): UserInfo | null {
    return this.currentUserSubject.value;
  }

  login(idPessoa: number, idConta: number, nome: string) {
    const user: UserInfo = { idPessoa, idConta, nome };
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
} 