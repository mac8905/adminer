import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { ControlModalCreateComponent } from './control-modal-create/control-modal-create.component';
import { ControlModalEditComponent } from './control-modal-edit/control-modal-edit.component';
import { ControlModalDeleteComponent } from './control-modal-delete/control-modal-delete.component';

import { ControlsService } from '../../../../services/controls.service';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    noDataMessage: 'No hay registros',
    columns: {
      stocks_id: {
        title: 'Equipo',
        type: 'string',
      },
      check_id: {
        title: 'Tipo',
        type: 'string',
      },
      date_schedules: {
        title: 'Fecha programada',
        type: 'string',
      },
      user_id: {
        title: 'Registrado por',
        type: 'string',
      },
      status: {
        title: 'Estado',
        type: 'html',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private controlsService: ControlsService,
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.controlsService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              let status = null;
              
              if (element.status && element.status._id === _const.status.active) {
                status = `<b class="text-success">${element.status.label}</b>`;
              } else if (element.status && element.status._id === _const.status.inactive) {
                status = `<b class="text-warning">${element.status.label}</b>`;
              } else if (element.status && element.status._id === _const.status.executed) {
                status = `<b class="text-info">${element.status.label}</b>`;
              } else if (element.status && element.status._id === _const.status.delete) {
                status = `<b class="text-danger">${element.status.label}</b>`;
              }
              
              data.push({
                data: element || null,
                stocks_id: (element.stocks_id) ? element.stocks_id.equipment : null,
                check_id: (element.check_id) ? element.check_id.label : null,
                date_schedules: (element.date_schedules) ? new DatePipe('en-US').transform(element.date_schedules, 'yyyy/MM/dd hh:mm a') : null,
                user_id: (element.user_id) ? element.user_id.full_names : null,
                status: (element.status) ? status : null,
              });
            });
          } else {
            this._notificationsService.info('No hay registros');
          }

          this.source.load(data);
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  onCreate(event: any) {
    const activeModal = this.modalService.open(ControlModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(ControlModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(ControlModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
