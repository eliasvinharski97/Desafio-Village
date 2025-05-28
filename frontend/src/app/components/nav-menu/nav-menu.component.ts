import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">Conta</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/deposito" routerLinkActive="active">Depósito</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/saque" routerLinkActive="active">Saque</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/extrato" routerLinkActive="active">Extrato</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
})
export class NavMenuComponent {} 