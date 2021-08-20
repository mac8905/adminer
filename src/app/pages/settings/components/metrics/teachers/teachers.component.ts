import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from '../../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { TeachersService } from '../../../../../services/teachers.service';

import { TeacherModalCreateComponent } from './teacher-modal-create/teacher-modal-create.component';
import { TeacherModalDeleteComponent } from './teacher-modal-delete/teacher-modal-delete.component';
import { TeacherModalEditComponent } from './teacher-modal-edit/teacher-modal-edit.component';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
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
      full_names: {
        title: 'Nombre',
        type: 'string',
      },
      career_id: {
        title: 'Carrera',
        type: 'string',
      },
      date_admission: {
        title: 'Fecha de admisión',
        type: 'date',
      },
      semester_admission: {
        title: 'Semestre de admisión',
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
    private teachersService: TeachersService,
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this
      .teachersService
      .getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                data: element || null,
                full_names: (element.user_id) ? element.user_id.full_names : null,
                career_id: (element.career_id) ? element.career_id.name : null,
                date_admission: (element.date_admission) ? new DatePipe('en-US').transform(element.date_admission, 'yyyy/MM/dd hh:mm a') : null,
                semester_admission: (element.semester_admission) ? element.semester_admission.label : null,
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
    const activeModal = this.modalService.open(TeacherModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(TeacherModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    // const activeModal = this.modalService.open(TeacherModalDeleteComponent, { size: 'sm' });
    // activeModal.componentInstance.modalHeader = 'ELIMINAR';
    // activeModal.componentInstance.source = this.source;
    // activeModal.componentInstance.data = event.data;
  }

}
