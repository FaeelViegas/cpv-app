// src/app/layout/sidebar/sidebar.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() sidebarToggled = new EventEmitter<boolean>();
  isExpanded = true;
  menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'fas fa-chart-line',
      route: '/dashboard',
      active: false
    },
    {
      title: 'Clientes',
      icon: 'fas fa-users',
      route: '/clients',
      active: false
    },
    {
      title: 'Desempenho',
      icon: 'fas fa-chart-bar',
      route: '/performance',
      active: false
    },
    {
      title: 'Configurações',
      icon: 'fas fa-cog',
      route: '/settings',
      active: false
    }
  ];

  constructor(private router: Router) { }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarToggled.emit(this.isExpanded);
  }
}