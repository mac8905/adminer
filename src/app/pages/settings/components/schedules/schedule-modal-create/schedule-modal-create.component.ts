import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { ConstantsService } from '../../../../../services/constants.service';
import { MetricsService } from '../../../../../services/metrics.service';
import { SchedulesService } from '../../../../../services/schedules.service';
import { TeachersService } from '../../../../../services/teachers.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-schedule-modal-create',
  templateUrl: './schedule-modal-create.component.html',
  styleUrls: ['./schedule-modal-create.component.scss']
})
export class ScheduleModalCreateComponent implements OnInit {
  formSchedule: FormGroup;
  modalHeader: string;
  listCareers: Array<any>;      // metrics
  listDays: Array<any>;         // constants
  listHours: Array<any>;        // constants
  listLaboratories: Array<any>; // metrics
  listSemesters: Array<any>;    // constants
  listSubjects: Array<any>;
  listTeachers: Array<any>;     // teachers
  listYears: Array<any>;        // constants
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private constantsService: ConstantsService,
    private metricsService: MetricsService,
    private schedulesService: SchedulesService,
    private teachersService: TeachersService,
  ) { }

  ngOnInit() {
    this.formSchedule = this.fb.group({
      semester: ['', Validators.required],
      year: ['', Validators.required],
      day: ['', Validators.required],
      hour: ['', Validators.required],
      laboratory_id: ['', Validators.required],
      career: ['', Validators.required],
      teacher: ['', Validators.required],
      subject: ['', Validators.required],
    });

    this.getListMetrics({ type: 'career' });
    this.getListMetrics({ type: 'laboratory' });

    this.getListByFather({ father: _const.fathers.days });
    this.getListByFather({ father: _const.fathers.blocks });
    this.getListByFather({ father: _const.fathers.semesters });
    this.getListByFather({ father: _const.fathers.year });
  }

  private getListTeachers(body): void {
    this
      .teachersService
      .getTeachersCareer(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listTeachers = res.data;
          } else {
            this._notificationsService.info('No hay registros');
          }
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  private getListByFather(body): void {
    this
      .constantsService
      .getListByFather(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (body.father) {
              case _const.fathers.days:
                this.listDays = res.data;
                break;

              case _const.fathers.blocks:
                this.listHours = res.data;
                break;

              case _const.fathers.semesters:
                this.listSemesters = res.data;
                break;

              case _const.fathers.year:
                this.listYears = res.data;
                break;
            }
          } else {
            this._notificationsService.info('No hay registros');
          }
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  private getListMetrics(body): void {
    this.metricsService.getListMetrics(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (body.type) {
              case 'career':
                this.listCareers = res.data;
                break;

              case 'laboratory':
                this.listLaboratories = res.data;
                break;
            }
          } else {
            this._notificationsService.info('No hay registros');
          }
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  setListTeachers(event) {
    this.getListTeachers({ _id: event });
  }

  setListSubjects(event) {
    const current = this.listTeachers.filter(item => item._id === event);
    this.listSubjects = current[0].subject_id;
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.add({ value, valid });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible guardar los cambios. Por favor intenta nuevamente.'
      );
    }
  }

  add({ value, valid }: { value: any, valid: boolean }): void {
    const result = JSON.stringify(value);

    if (
      result !== null &&
      result !== undefined &&
      result !== ''
    ) {
      value.status = _const.status.busy;

      this.schedulesService.create(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.add({
              data: res.data || null,
              semester: (res.data.semester) ? res.data.semester.label : null,
              year: (res.data.year) ? res.data.year.label : null,
              day: (res.data.day) ? res.data.day.label : null,
              hour: (res.data.hour) ? res.data.hour.label : null,
              laboratory_id: (res.data.laboratory_id) ? res.data.laboratory_id.name : null,
              career: (res.data.career) ? res.data.career.name : null,
              teacher: (res.data.teacher) ? res.data.teacher.user_id.full_names : null,
              subject: (res.data.subject) ? res.data.subject.name : null,
              status: (res.data.status) ? res.data.status.label : null,
            });

            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitósa', res.message);
          } else {
            this._notificationsService.error('Transacción fallida', res.message);
          }
        }, error => {
          this._notificationsService.error('Transacción fallida', error);
        });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible guardar los cambios. Por favor intenta nuevamente.'
      );
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
