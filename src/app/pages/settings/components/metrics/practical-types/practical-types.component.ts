import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from '../../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { MetricsService } from '../../../../../services/metrics.service';

import { PracticalTypeModalCreateComponent } from './practical-type-modal-create/practical-type-modal-create.component';
import { PracticalTypeModalDeleteComponent } from './practical-type-modal-delete/practical-type-modal-delete.component';
import { PracticalTypeModalEditComponent } from './practical-type-modal-edit/practical-type-modal-edit.component';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'app-practical-types',
  templateUrl: './practical-types.component.html',
  styleUrls: ['./practical-types.component.scss']
})
export class PracticalTypesComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private smartTablesComponent: SmartTablesComponent;
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
      name: {
        title: 'Nombre',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private metricsService: MetricsService,
  ) {
  }

  ngOnInit() {
    this.getListMetrics({ type: 'practical_type' });
  }

  private getListMetrics(body): void {
    this.metricsService.getListMetrics(body)
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                data: element || null,
                name: element.name || null,
                description: element.description || null,
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
    const activeModal = this.modalService.open(PracticalTypeModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(PracticalTypeModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(PracticalTypeModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
