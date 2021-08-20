import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from '../../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { MetricsService } from '../../../../../services/metrics.service';

import { DirectedPracticeModalCreateComponent } from './directed-practice-modal-create/directed-practice-modal-create.component';
import { DirectedPracticeModalDeleteComponent } from './directed-practice-modal-delete/directed-practice-modal-delete.component';
import { DirectedPracticeModalEditComponent } from './directed-practice-modal-edit/directed-practice-modal-edit.component';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-directed-practices',
  templateUrl: './directed-practices.component.html',
  styleUrls: ['./directed-practices.component.scss']
})
export class DirectedPracticesComponent implements OnInit {
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
      career: {
        title: 'Carrera',
        type: 'string',
      },
      practical_type: {
        title: 'Tipo de pŕactica',
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
    this.getListMetrics({ type: 'directed_practice' });
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
                career: (element.metric_rel.career) ? element.metric_rel.career.name : null,
                practical_type: (element.metric_rel.practical_type) ? element.metric_rel.practical_type.name : null,
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
    const activeModal = this.modalService.open(DirectedPracticeModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(DirectedPracticeModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(DirectedPracticeModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
