import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'nga-smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTablesComponent {
  query: string = '';
  @Input() title: string;
  @Input() settings: any;
  @Input() source: any;

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();

  @Output() emitCreateConfirm = new EventEmitter<any>();
  @Output() emitDeleteConfirm = new EventEmitter<any>();
  @Output() emitEditConfirm = new EventEmitter<any>();

  constructor() {
  }

  onCreateConfirm(event): void {
    this.emitCreateConfirm.emit(event);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('¿Estas seguro de borrar el registro?')) {
      this.emitDeleteConfirm.emit(event);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    this.emitEditConfirm.emit(event);
  }
}
