import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './layout/system/system.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      },
      {
        path: 'clients',
        component: ClientsComponent,
        data: { title: 'Clientes', breadcrumb: 'Clientes' }
      },
      {
        path: 'performance',
        component: PerformanceComponent,
        data: { title: 'Desempenho', breadcrumb: 'Desempenho' }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: { title: 'Configurações', breadcrumb: 'Configurações' }
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
