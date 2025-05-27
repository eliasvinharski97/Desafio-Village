import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AccountFormComponent {
  accountForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  isValidatingPerson = false;
  personExists = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      idPessoa: ['', [Validators.required, Validators.min(1)]],
      saldo: ['', [Validators.required, Validators.min(0)]],
      limiteSaqueDiario: ['', [Validators.required, Validators.min(0)]],
      tipoConta: ['', [Validators.required]],
      flagAtivo: [true]
    });

    // Monitorar mudanças no campo idPessoa
    this.accountForm.get('idPessoa')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value && value > 0) {
          this.validatePerson(value);
        } else {
          this.personExists = false;
        }
      });
  }

  validatePerson(idPessoa: number) {
    this.isValidatingPerson = true;
    this.errorMessage = '';
    
    this.accountService.validatePerson(idPessoa).subscribe({
      next: (exists) => {
        this.personExists = exists;
        this.isValidatingPerson = false;
        if (!exists) {
          this.errorMessage = 'Pessoa não encontrada com este ID';
        }
      },
      error: () => {
        this.isValidatingPerson = false;
        this.personExists = false;
        this.errorMessage = 'Erro ao validar pessoa';
      }
    });
  }

  getFormDebugInfo(): string {
    if (!this.accountForm.valid) return '';

    const formData = {
      pessoa: {
        idPessoa: Number(this.accountForm.value.idPessoa)
      },
      saldo: Number(this.accountForm.value.saldo),
      limiteSaqueDiario: Number(this.accountForm.value.limiteSaqueDiario),
      tipoConta: Number(this.accountForm.value.tipoConta),
      flagAtivo: this.accountForm.value.flagAtivo
    };

    return JSON.stringify(formData, null, 2);
  }

  onSubmit() {
    if (this.accountForm.valid && !this.isValidatingPerson && this.personExists) {
      const formValue = {
        pessoa: {
          idPessoa: Number(this.accountForm.value.idPessoa)
        },
        saldo: Number(this.accountForm.value.saldo),
        limiteSaqueDiario: Number(this.accountForm.value.limiteSaqueDiario),
        tipoConta: Number(this.accountForm.value.tipoConta),
        flagAtivo: this.accountForm.value.flagAtivo
      };

      console.log('Enviando dados:', formValue);

      this.accountService.createAccount(formValue).subscribe({
        next: (response) => {
          console.log('Resposta do servidor:', response);
          this.successMessage = 'Conta criada com sucesso!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error) => {
          console.error('Erro do servidor:', error);
          this.errorMessage = error.error?.message || 'Erro ao criar conta';
          this.successMessage = '';
        }
      });
    } else if (!this.personExists) {
      this.errorMessage = 'Por favor, insira um ID de pessoa válido';
    }
  }
} 