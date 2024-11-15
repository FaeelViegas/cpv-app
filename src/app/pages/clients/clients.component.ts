import { Component } from '@angular/core';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  usuarios: any[] = [];

  ngOnInit() {
  }
  rows = [
    { name: 'João', age: 25, city: 'São Paulo' },
    { name: 'Maria', age: 30, city: 'Rio de Janeiro' }
  ];

  columns = [
    { prop: 'name', name: 'Nome' },
    { prop: 'age', name: 'Idade' },
    { prop: 'city', name: 'Cidade' }
  ];
}