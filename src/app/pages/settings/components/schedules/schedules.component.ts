import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from '../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { SchedulesService } from '../../../../services/schedules.service';

import { ScheduleModalCreateComponent } from './schedule-modal-create/schedule-modal-create.component';
import { ScheduleModalDeleteComponent } from './schedule-modal-delete/schedule-modal-delete.component';
import { ScheduleModalEditComponent } from './schedule-modal-edit/schedule-modal-edit.component';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
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
      deleteButtonContent: '<i class=""></i>',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    noDataMessage: 'No hay registros',
    columns: {
      year: {
        title: 'Año',
        type: 'string',
      },
      semester: {
        title: 'Semestre',
        type: 'number',
      },
      day: {
        title: 'Día',
        type: 'string',
      },
      hour: {
        title: 'Hora',
        type: 'string',
      },
      laboratory_id: {
        title: 'Laboratorio',
        type: 'string',
      },
      career: {
        title: 'Carrera',
        type: 'string',
      },
      teacher: {
        title: 'Docente',
        type: 'string',
      },
      subject: {
        title: 'Asignatura',
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
    private schedulesService: SchedulesService,
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.schedulesService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                data: element || null,
                semester: (element.semester) ? element.semester.label : null,
                year: (element.year) ? element.year.label : null,
                day: (element.day) ? element.day.label : null,
                hour: (element.hour) ? element.hour.label : null,
                laboratory_id: (element.laboratory_id) ? element.laboratory_id.name : null,
                career: (element.career) ? element.career.name : null,
                teacher: (element.teacher) ? element.teacher.user_id.full_names : null,
                subject: (element.subject) ? element.subject.name : null,
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
    const activeModal = this.modalService.open(ScheduleModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(ScheduleModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
