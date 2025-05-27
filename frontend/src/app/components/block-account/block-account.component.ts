import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-block-account',
  templateUrl: './block-account.component.html',
  styleUrls: ['./block-account.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class BlockAccountComponent {
  blockForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService
  ) {
    this.blockForm = this.fb.group({
      accountId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.blockForm.valid) {
      const { accountId } = this.blockForm.value;
      this.accountService.toggleBlock(accountId).subscribe({
        next: () => {
          this.successMessage = 'Status da conta atualizado com sucesso!';
          this.errorMessage = '';
          this.blockForm.reset();
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Erro ao atualizar status da conta';
          this.successMessage = '';
        }
      });
    }
  }
} 