import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-12 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Bem-vindo(a), {{nomePessoa}}</h5>
              <div class="row mt-4">
                <div class="col-md-6">
                  <div class="card bg-light">
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">Saldo Atual</h6>
                      <h4 class="card-title mb-0">{{saldo | currency:'BRL'}}</h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card bg-light">
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">Limite de Saque Diário</h6>
                      <h4 class="card-title mb-0">{{limiteSaqueDiario | currency:'BRL'}}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">Depósito</h5>
                  <p class="card-text">Realizar um novo depósito em sua conta</p>
                  <a routerLink="/deposito" class="btn btn-primary">Depositar</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">Saque</h5>
                  <p class="card-text">Realizar um saque da sua conta</p>
                  <a routerLink="/saque" class="btn btn-primary">Sacar</a>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center">
                <div class="card-body">
                  <h5 class="card-title">Extrato</h5>
                  <p class="card-text">Visualizar o extrato da sua conta</p>
                  <a routerLink="/extrato" class="btn btn-primary">Ver Extrato</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  saldo: number = 0;
  limiteSaqueDiario: number = 0;
  nomePessoa: string = '';
  idConta: number = 1; // Temporário, depois vamos pegar do login

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.carregarDadosConta();
  }

  carregarDadosConta() {
    this.accountService.getAccount(this.idConta).subscribe({
      next: (conta) => {
        this.saldo = conta.saldo;
        this.limiteSaqueDiario = conta.limiteSaqueDiario;
        // Aqui você pode adicionar a lógica para buscar o nome da pessoa
      },
      error: (error) => {
        console.error('Erro ao carregar dados da conta:', error);
      }
    });
  }
} 