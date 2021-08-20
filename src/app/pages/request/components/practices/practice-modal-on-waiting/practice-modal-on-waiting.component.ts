import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { PracticesService } from '../../../../../services/practices.service';
import { SubjectsService } from '../../../../../services/subjects.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-practice-modal-on-waiting',
  templateUrl: './practice-modal-on-waiting.component.html',
  styleUrls: ['./practice-modal-on-waiting.component.scss']
})
export class PracticeModalOnWaitingComponent implements OnInit {
  data: any;
  form: FormGroup;
  listDeliveries: Array<any>;
  listSubjects: Array<any>;
  modalHeader: string;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private practicesService: PracticesService,
    private subjectsService: SubjectsService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      requests_id: this.fb.group({
        user_id: this.fb.group({
          username: [(this.data.data.requests_id.user_id.username) ? this.data.data.requests_id.user_id.username : ''],
          full_names: [(this.data.data.requests_id.user_id.full_names) ? this.data.data.requests_id.user_id.full_names : ''],
          email: [(this.data.data.requests_id.user_id.email) ? this.data.data.requests_id.user_id.email : ''],
        }),
        date_created: [(this.data.data.requests_id.date_created) ? this.data.data.requests_id.date_created : ''],
        practice_type: [(this.data.data.requests_id.practice_type) ? this.data.data.requests_id.practice_type.name : ''],
        practice_guided: [(this.data.data.requests_id.practice_guided) ? this.data.data.requests_id.practice_guided.name : ''],
        practice_name: [(this.data.data.requests_id.practice_name) ? this.data.data.requests_id.practice_name : ''],
        laboratory_id: [(this.data.data.requests_id.laboratory_id) ? this.data.data.requests_id.laboratory_id.name : ''],
        date_request: [(this.data.data.requests_id.date_request) ? this.data.data.requests_id.date_request.slice(0, 10) : ''],
        year: [(this.data.data.requests_id.year) ? this.data.data.requests_id.year : ''],
        semester: [(this.data.data.requests_id.semester) ? this.data.data.requests_id.semester : ''],
        day: [(this.data.data.requests_id.day) ? this.data.data.requests_id.day : ''],
        hour: [(this.data.data.requests_id.hour) ? this.data.data.requests_id.hour.label : ''],
        observations: [(this.data.data.requests_id.observations) ? this.data.data.requests_id.observations : ''],
        user_receives: [(this.data.data.requests_id.user_receives) ? this.data.data.requests_id.user_receives : ''],
        state: [(this.data.data.requests_id.state) ? this.data.data.requests_id.state : ''],
      }),
      university: [(this.data.data.university) ? this.data.data.university : ''],
      subject_id: [(this.data.data.subject_id) ? this.data.data.subject_id._id : ''],
      delivery: [(this.data.data.delivery) ? '' : ''],
      observation: [(this.data.data.observation) ? this.data.data.observation : ''],
      equipment: this.fb.array([]),
      users: this.fb.array([]),
      status: [(this.data.data.status.label) ? this.data.data.status.label : ''],
    });

    this.initEquipments();
    this.initUsers();
    this.getAllSubjects();
  }

  private getAllSubjects(): void {
    this
      .subjectsService
      .getAll()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listSubjects = res.data;
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

  public initEquipments(): void {
    if (
      this.data.data.equipment !== undefined &&
      this.data.data.equipment !== null &&
      this.data.data.equipment.length > 0
    ) {
      const control = <FormArray>this.form.controls['equipment'];

      this.data.data.equipment.forEach(element => {
        const form = this.fb.group({
          equipment: [(element.equipment) ? element.equipment : ''],
        });

        control.push(form);
      });
    }
  }

  public initUsers(): void {
    if (
      this.data.data.users !== undefined &&
      this.data.data.users !== null &&
      this.data.data.users.length > 0
    ) {
      const control = <FormArray>this.form.controls['users'];

      this.data.data.users.forEach(element => {
        const form = this.fb.group({
          username: [(element.username) ? element.username : ''],
          full_names: [(element.full_names) ? element.full_names : ''],
          career: [(element.career) ? element.career.name : ''],
          mobile: [(element.mobile) ? element.mobile : ''],
          email: [(element.email) ? element.email : ''],
        });

        control.push(form);
      });
    }
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

      this.practicesService.updateStatus(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this._notificationsService.success('Transacción exitósa', 'Estado de la práctica en proceso.');

            this.practicesService.update(value)
              .subscribe(res => {
                if (res.success && res.data) {
                  this.source.update(
                    this.data,
                    {
                      data: res.data || null,
                      consecutive: (res.data.requests_id) ? res.data.requests_id.consecutive : '',
                      laboratory_id: (res.data.requests_id) ? res.data.requests_id.laboratory_id.name : '',
                      subject_id: (res.data.subject_id) ? res.data.subject_id.name : '',
                      update: (res.data.update) ? new DatePipe('en-US').transform(res.data.update, 'yyyy/MM/dd hh:mm a') : null,
                      status: (res.data.status) ? res.data.status.label : '',
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
