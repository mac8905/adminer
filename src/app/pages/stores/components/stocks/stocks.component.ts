import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { StockModalCreateComponent } from './stock-modal-create/stock-modal-create.component';
import { StockModalDeleteComponent } from './stock-modal-delete/stock-modal-delete.component';
import { StockModalEditComponent } from './stock-modal-edit/stock-modal-edit.component';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { StocksService } from '../../../../services/stocks.service';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private smartTablesComponent: SmartTablesComponent;
  source: LocalDataSource = new LocalDataSource();;
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
      code: {
        title: 'Cod.',
        type: 'string',
      },
      succession: {
        title: '# Serie',
        type: 'string',
      },
      trademark: {
        title: 'Marca',
        type: 'string',
      },
      equipment: {
        title: 'Equipo',
        type: 'string',
      },
      model: {
        title: 'Modelo',
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
    private stocksService: StocksService,
  ) { }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.stocksService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              let status = null;
              
              if (element.status && element.status._id === _const.status.available) {
                status = `<b class="text-success">${element.status.label}</b>`;
              } else if (element.status && element.status._id === _const.status.notavailable) {
                status = `<b class="text-danger">${element.status.label}</b>`;
              } else if (element.status && element.status._id === _const.status.busy) {
                status = `<b class="text-warning">${element.status.label}</b>`;
              }
              
              data.push({
                data: element,
                invoice: (element.entry_id) ? element.entry_id.invoice : null,
                code: element.code || null,
                succession: element.succession || null,
                trademark: element.trademark || null,
                equipment: element.equipment || null,
                model: element.model || null,
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
    const activeModal = this.modalService.open(StockModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(StockModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(StockModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
