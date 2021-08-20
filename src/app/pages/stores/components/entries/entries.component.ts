import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { EntryModalCreateComponent } from './entry-modal-create/entry-modal-create.component';
import { EntryModalEditComponent } from './entry-modal-edit/entry-modal-edit.component';
import { EntryModalDeleteComponent } from './entry-modal-delete/entry-modal-delete.component';

import { EntriesService } from '../../../../services/entries.service';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private smartTablesComponent: SmartTablesComponent;
  source: LocalDataSource = new LocalDataSource();
  private user: any;
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
      invoice: {
        title: 'N° Factura',
        type: 'string',
      },
      date: {
        title: 'Fecha',
        type: 'date',
      },
      username: {
        title: 'Recibe',
        type: 'string',
      },
      per_delivery: {
        title: 'Entrega',
        type: 'string',
      },
      entry: {
        title: 'Entrada',
        type: 'string',
      },
      provider_id: {
        title: 'Proveedor',
        type: 'string',
      },
      contract: {
        title: 'Contrato',
        type: 'string',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private entriesService: EntriesService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.entriesService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                _id: element._id || null,
                invoice: element.invoice || null,
                date: (element.date) ? new DatePipe('en-US').transform(element.date, 'yyyy/MM/dd hh:mm a') : null,
                _date: (element.date) ? element.date : null,
                username: (element.username) ? element.username.full_names : null,
                _username: (element.username) ? element.username : null,
                per_delivery: element.per_delivery || null,
                entry: element.entry || null,
                provider_id: (element.provider_id) ? element.provider_id.name : null,
                _provider_id: (element.provider_id) ? element.provider_id : null,
                contract: element.contract || null,
                _descriptions: (element.description) ? element.description : null,
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
    const activeModal = this.modalService.open(EntryModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(EntryModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(EntryModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
