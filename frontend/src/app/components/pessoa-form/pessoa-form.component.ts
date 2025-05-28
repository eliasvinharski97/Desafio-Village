import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PessoaFormComponent {
  pessoaForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private pessoaService: PessoaService,
    private router: Router
  ) {
    this.pessoaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', [Validators.required]]
    });
  }

  getMaxDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.pessoaForm.valid) {
      const formData = this.pessoaForm.value;
      
      // Formatando a data para o padrão yyyy-MM-dd
      let formattedDate = formData.dataNascimento;
      if (formData.dataNascimento.includes('/')) {
        const [dia, mes, ano] = formData.dataNascimento.split('/');
        formattedDate = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
      }

      const pessoa = {
        nome: formData.nome.trim(),
        cpf: formData.cpf.replace(/\D/g, ''),
        dataNascimento: formattedDate
      };

      console.log('Enviando dados:', pessoa);

      this.pessoaService.criar(pessoa).subscribe({
        next: (response) => {
          console.log('Resposta do servidor:', response);
          this.successMessage = 'Pessoa cadastrada com sucesso!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erro completo:', error);
          if (error.error && typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else if (error.status === 0) {
            this.errorMessage = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
          } else if (error.status === 400) {
            this.errorMessage = 'Dados inválidos. Verifique os campos e tente novamente.';
          } else if (error.status === 500) {
            this.errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
          } else {
            this.errorMessage = 'Erro ao cadastrar pessoa. Tente novamente.';
          }
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
    }
  }
} 