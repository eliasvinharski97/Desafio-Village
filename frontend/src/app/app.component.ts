import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavMenuComponent],
  template: `
    <app-nav-menu></app-nav-menu>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Conta';
} 