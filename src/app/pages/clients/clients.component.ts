import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild(DatatableComponent) table!: DatatableComponent;

  rows: Cliente[] = [];
  temp: Cliente[] = [];
  loading: boolean = false;

  constructor(private clienteServ: ClienteService) { }

  ngOnInit() {
    this.loadCliente();
  }

  loadCliente() {
    this.loading = true;
    this.clienteServ.list().subscribe({
      next: (data) => {
        this.temp = [...data];
        this.rows = data;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.clienteId.toString().includes(val) ||
        d.nome.toLowerCase().includes(val) ||
        !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}