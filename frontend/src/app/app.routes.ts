import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BlockAccountComponent } from './components/block-account/block-account.component';
import { StatementComponent } from './components/statement/statement.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-account', component: AccountFormComponent },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'balance', component: BalanceComponent },
  { path: 'block-account', component: BlockAccountComponent },
  { path: 'statement', component: StatementComponent }
]; 