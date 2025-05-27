import { Routes } from '@angular/router';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountOperationsComponent } from './components/account-operations/account-operations.component';
 
export const routes: Routes = [
  { path: '', redirectTo: '/accounts/new', pathMatch: 'full' },
  { path: 'accounts/new', component: AccountFormComponent },
  { path: 'accounts/operations', component: AccountOperationsComponent }
]; 