import { Component } from '@angular/core';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent {
  isSidebarCollapsed = false;

  onSidebarToggle(expanded: boolean) {
    this.isSidebarCollapsed = !expanded;
  }
}
