import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { PessoaService } from '../../services/pessoa.service';
import { AuthService } from '../../services/auth.service';
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
  personName = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private pessoaService: PessoaService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.accountForm = this.fb.group({
      idPessoa: ['', [Validators.required, Validators.min(1)]],
      saldo: ['', [Validators.required, Validators.min(0)]],
      limiteSaqueDiario: ['', [Validators.required, Validators.min(0)]],
      tipoConta: ['', [Validators.required]],
      flagAtivo: [true]
    });

    // Pegar o ID da pessoa da URL se disponível
    this.route.queryParams.subscribe(params => {
      if (params['idPessoa']) {
        this.accountForm.patchValue({ idPessoa: params['idPessoa'] });
        this.validatePerson(params['idPessoa']);
      }
    });

    // Monitorar mudanças no campo idPessoa
    this.accountForm.get('idPessoa')?.valueChanges.subscribe(value => {
      if (value && value > 0) {
        this.validatePerson(value);
      } else {
        this.personExists = false;
        this.personName = '';
      }
    });
  }

  validatePerson(idPessoa: number) {
    this.isValidatingPerson = true;
    this.errorMessage = '';
    
    this.pessoaService.buscarPorId(idPessoa).subscribe({
      next: (pessoa) => {
        this.personExists = true;
        this.personName = pessoa.nome;
        this.isValidatingPerson = false;
      },
      error: () => {
        this.isValidatingPerson = false;
        this.personExists = false;
        this.personName = '';
        this.errorMessage = 'Pessoa não encontrada com este ID';
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

      this.accountService.createAccount(formValue).subscribe({
        next: (response) => {
          this.successMessage = 'Conta criada com sucesso!';
          this.errorMessage = '';
          
          // Fazer login automático
          this.authService.login(
            formValue.pessoa.idPessoa,
            response.idConta!,
            this.personName
          );

          // Redirecionar para o dashboard
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao criar conta';
          this.successMessage = '';
        }
      });
    }
  }
} 