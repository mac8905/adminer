import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SwitchComponent } from 'angular2-bootstrap-switch/components';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { ConstantsService } from '../../../../../../services/constants.service';
import { MetricsService } from '../../../../../../services/metrics.service';
import { TeachersService } from '../../../../../../services/teachers.service';
import { UsersService } from '../../../../../../services/users.service';

import { _const } from '../../../../../../commons/constants';

const now = new Date();

@Component({
  selector: 'nga-app-teacher-modal-edit',
  templateUrl: './teacher-modal-edit.component.html',
  styleUrls: ['./teacher-modal-edit.component.scss']
})
export class TeacherModalEditComponent implements OnInit {
  data: any;
  date: NgbDateStruct;
  formTeacher: FormGroup;
  listCareers: Array<any>;
  listSemesters: Array<any>;
  listSubjects: Array<any>;
  listUsers: Array<any>;
  meridian = true;
  modalHeader: string;
  source: LocalDataSource;
  time: any;

  // checkbox
  status: boolean = false;
  onText: string = 'on';
  offText: string = 'off';
  onColor: string = 'green';
  offColor: string = 'red';
  size: string = 'mini';

  constructor(
    private activeModal: NgbActiveModal,
    private constantsService: ConstantsService,
    private fb: FormBuilder,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
    private teachersService: TeachersService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.dateInit();

    this.formTeacher = this.fb.group({
      user_id: [(this.data.data.user_id) ? this.data.data.user_id._id : null, Validators.required],
      career_id: [(this.data.data.career_id) ? this.data.data.career_id._id : null, Validators.required],
      subject_id: [(this.data.data.subject_id) ? this.data.data.subject_id : null, Validators.required],
      date: [''],
      time: [''],
      semester_admission: [
        (this.data.data.semester_admission) ? this.data.data.semester_admission._id : null,
        Validators.required
      ],
      status: [(this.data.data.status) ? this.data.data.status._id : null],
    });

    if (this.data.data.status._id === _const.status.active) {
      this.status = true;
    }

    this.getByProfile(_const.profiles.teacher);
    this.getListMetrics({ type: 'career' });
    this.getListByFather({ father: _const.fathers.semesters });
    this.setListSubjects(this.data.data.career_id._id);
  }

  dateInit() {
    if (
      this.data.data.date_admission !== undefined &&
      this.data.data.date_admission !== null &&
      this.data.data.date_admission !== ''
    ) {
      const _date = new Date(this.data.data.date_admission);

      this.date = {
        year: _date.getFullYear(),
        month: _date.getMonth() + 1,
        day: _date.getDate(),
      };

      this.time = {
        hour: _date.getHours(),
        minute: _date.getMinutes(),
      };
    } else {
      this.date = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
      this.time = { hour: now.getHours(), minute: now.getMinutes() };
    }
  }

  private getListByFather(body): void {
    this
      .constantsService
      .getListByFather(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (body.father) {
              case _const.fathers.semesters:
                this.listSemesters = res.data;
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

  private getByProfile(id): void {
    this
      .usersService
      .getByProfile(id)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listUsers = res.data;
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

  private getSubjectsCareer(data): void {
    let message = '';

    this
      .teachersService
      .getSubjectsCareer(data)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listSubjects = res.data;
          } else {
            this.listSubjects = null;
            message = 'No hay materias relacionadas a la carrera';
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          this.listSubjects = null;
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        this.listSubjects = null;
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  setListSubjects(event) {
    this.getSubjectsCareer({ _id: event });
  }

  onChange() {
    this.status = !this.status;
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
      if (this.status) {
        value.status = _const.status.active;
      } else {
        value.status = _const.status.inactive;
      }

      value._id = this.data.data._id;
      value.date_admission = this.getDatetime(value.date, value.time).toISOString();

      this.teachersService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
                data: res.data || null,
                full_names: (res.data.user_id) ? res.data.user_id.full_names : null,
                career_id: (res.data.career_id) ? res.data.career_id.name : null,
                date_admission: (res.data.date_admission) ? new DatePipe('en-US').transform(res.data.date_admission, 'yyyy/MM/dd hh:mm a') : null,
                semester_admission: (res.data.semester_admission) ? res.data.semester_admission.label : null,
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

  private getDatetime(date: any, time: any): any {
    return new Date(`${date.year}-${date.month}-${date.day} ${time.hour}:${time.minute}:00`);
  }

}
