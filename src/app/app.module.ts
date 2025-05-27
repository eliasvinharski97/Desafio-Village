import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AccountFormComponent } from './components/account-form/account-form.component';
import { AccountOperationsComponent } from './components/account-operations/account-operations.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    AccountOperationsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/accounts', pathMatch: 'full' },
      { path: 'accounts', component: AccountFormComponent },
      { path: 'operations/:id', component: AccountOperationsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 