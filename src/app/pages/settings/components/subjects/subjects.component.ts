import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from '../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { SubjectsService } from '../../../../services/subjects.service';

import { SubjectModalCreateComponent } from './subject-modal-create/subject-modal-create.component';
import { SubjectModalDeleteComponent } from './subject-modal-delete/subject-modal-delete.component';
import { SubjectModalEditComponent } from './subject-modal-edit/subject-modal-edit.component';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
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
      status: {
        title: 'Estado',
        type: 'string',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private subjectsService: SubjectsService,
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.subjectsService.getAll()
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
                career: (element.career_id) ? element.career_id : null,
                status: (element.status) ? element.status.label : null,
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
    const activeModal = this.modalService.open(SubjectModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(SubjectModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(SubjectModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
