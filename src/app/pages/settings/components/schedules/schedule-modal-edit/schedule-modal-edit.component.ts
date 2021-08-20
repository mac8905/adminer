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
  selector: 'nga-app-schedule-modal-edit',
  templateUrl: './schedule-modal-edit.component.html',
  styleUrls: ['./schedule-modal-edit.component.scss']
})
export class ScheduleModalEditComponent implements OnInit {
  data: any;
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
      semester: [(this.data.data.semester) ? this.data.data.semester._id : '', Validators.required],
      year: [(this.data.data.year) ? this.data.data.year._id : '', Validators.required],
      day: [(this.data.data.day) ? this.data.data.day._id : '', Validators.required],
      hour: [(this.data.data.hour) ? this.data.data.hour._id : '', Validators.required],
      laboratory_id: [(this.data.data.laboratory_id) ? this.data.data.laboratory_id._id : '', Validators.required],
      career: [(this.data.data.career) ? this.data.data.career._id : '', Validators.required],
      teacher: [(this.data.data.teacher) ? this.data.data.teacher._id : '', Validators.required],
      subject: [(this.data.data.subject) ? this.data.data.subject._id : '', Validators.required],
    });

    this.getListMetrics({ type: 'career' });
    this.getListMetrics({ type: 'laboratory' });

    this.getListByFather({ father: _const.fathers.days });
    this.getListByFather({ father: _const.fathers.blocks });
    this.getListByFather({ father: _const.fathers.semesters });
    this.getListByFather({ father: _const.fathers.year });

    this.setListTeachers(this.data.data.career._id);

    this.disabledList({
      year: (this.data.data.year) ? this.data.data.year._id : '',
      semester: (this.data.data.semester) ? this.data.data.semester._id : '',
      laboratory_id: (this.data.data.laboratory_id) ? this.data.data.laboratory_id._id : '',
      day: (this.data.data.day) ? this.data.data.day._id : '',
    });
  }

  private disabledList(req): void {
    this
      .schedulesService
      .getSchedulesAvailable(req)
      .subscribe(res => {
        if (res.success && res.data && this.listHours) {
          res.data.forEach((item1, index1) => {
            this.listHours.forEach((item2, index2) => {
              if (
                item2._id === item1.hour &&
                item2._id !== this.data.data.hour._id
              ) {
                this.listHours.splice(index2, 1);
              }
            });
          });
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  private getListTeachers(body): void {
    this
      .teachersService
      .getTeachersCareer(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listTeachers = res.data;

            if (
              this.data.data.teacher &&
              this.data.data.teacher._id !== undefined &&
              this.data.data.teacher._id !== null &&
              this.data.data.teacher._id !== ''
            ) {
              this.setListSubjects(this.data.data.teacher._id);
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
      this.edit({ value, valid });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible guardar los cambios. Por favor intenta nuevamente.'
      );
    }
  }

  edit({ value, valid }: { value: any, valid: boolean }): void {
    const result = JSON.stringify(value);

    if (
      result !== null &&
      result !== undefined &&
      result !== ''
    ) {
      value._id = this.data.data._id;
      value.status = _const.status.busy;

      this.schedulesService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
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
