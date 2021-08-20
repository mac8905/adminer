import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from '../../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { MetricsService } from '../../../../../services/metrics.service';

import { CareerModalCreateComponent } from './career-modal-create/career-modal-create.component';
import { CareerModalDeleteComponent } from './career-modal-delete/career-modal-delete.component';
import { CareerModalEditComponent } from './career-modal-edit/career-modal-edit.component';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
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
      code: {
        title: 'Código',
        type: 'number',
      },
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
    this.getListMetrics({ type: 'career' });
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
                code: element.code || null,
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
    const activeModal = this.modalService.open(CareerModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(CareerModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(CareerModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
