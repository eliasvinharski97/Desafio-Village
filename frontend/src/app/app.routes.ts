import { Routes } from '@angular/router';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { StatementComponent } from './components/statement/statement.component';

export const routes: Routes = [
  // Rota inicial - Cadastro de pessoa
  { path: '', redirectTo: '/pessoas/nova', pathMatch: 'full' },
  { path: 'pessoas/nova', component: PessoaFormComponent },
  
  // Rota de criação de conta
  { path: 'contas/nova', component: AccountFormComponent },
  
  // Rotas principais após login
  { path: 'dashboard', component: DashboardComponent },
  { path: 'deposito', component: DepositComponent },
  { path: 'saque', component: WithdrawComponent },
  { path: 'extrato', component: StatementComponent },
  
  // Rota padrão - redireciona para o dashboard
  { path: '**', redirectTo: '/dashboard' }
]; 