import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { PreventiveModalCreateComponent } from './preventive-modal-create/preventive-modal-create.component';
import { PreventiveModalEditComponent } from './preventive-modal-edit/preventive-modal-edit.component';
import { PreventiveModalDeleteComponent } from './preventive-modal-delete/preventive-modal-delete.component';

import { MaintenancesService } from '../../../../services/maintenances.service';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-preventives',
  templateUrl: './preventives.component.html',
  styleUrls: ['./preventives.component.scss']
})
export class PreventivesComponent implements OnInit {
  private now: Date;
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
      date: {
        title: 'Fecha',
        type: 'string',
      },
      fault: {
        title: 'Avería',
        type: 'string',
      },
      user_id: {
        title: 'Realizado por',
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
    private maintenancesService: MaintenancesService,
  ) {
    this.now = new Date();
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.maintenancesService.getType({ type: _const.maintenance.preventive })
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
                date: (element.date) ? new DatePipe('en-US').transform(element.date, 'yyyy/MM/dd hh:mm a') : null,
                fault: (element.fault) ? element.fault : null,
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
    const activeModal = this.modalService.open(PreventiveModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(PreventiveModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(PreventiveModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
