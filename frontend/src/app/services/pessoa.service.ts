import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private apiUrl = 'http://localhost:8080/api/pessoas';

  constructor(private http: HttpClient) {}

  criar(pessoa: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, pessoa);
  }

  listar(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  buscarPorCpf(cpf: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/cpf/${cpf}`);
  }
} 