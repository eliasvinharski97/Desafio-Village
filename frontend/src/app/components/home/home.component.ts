import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HomeComponent {
  menuItems = [
    { path: '/create-account', label: 'Criar Conta', icon: 'person_add' },
    { path: '/deposit', label: 'Realizar Depósito', icon: 'add_circle' },
    { path: '/withdraw', label: 'Realizar Saque', icon: 'remove_circle' },
    { path: '/balance', label: 'Consultar Saldo', icon: 'account_balance' },
    { path: '/block-account', label: 'Bloquear Conta', icon: 'block' },
    { path: '/statement', label: 'Consultar Extrato', icon: 'receipt_long' }
  ];
} 