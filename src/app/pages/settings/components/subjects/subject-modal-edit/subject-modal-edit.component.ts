import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { MetricsService } from '../../../../../services/metrics.service';
import { SubjectsService } from '../../../../../services/subjects.service';

import { SwitchComponent } from 'angular2-bootstrap-switch/components';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-subject-modal-edit',
  templateUrl: './subject-modal-edit.component.html',
  styleUrls: ['./subject-modal-edit.component.scss']
})
export class SubjectModalEditComponent implements OnInit {
  data: any;
  formSubject: FormGroup;
  modalHeader: string;
  listCareers: Array<any>;
  source: LocalDataSource;

  // checkbox
  status: boolean = false;
  onText: string = 'on';
  offText: string = 'off';
  onColor: string = 'green';
  offColor: string = 'red';
  size: string = 'mini';

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
    private subjectsService: SubjectsService,
  ) { }

  ngOnInit() {
    this.formSubject = this.fb.group({
      code: [(this.data.code) ? this.data.code : '', Validators.required],
      name: [(this.data.name) ? this.data.name : '', Validators.required],
      description: [(this.data.description) ? this.data.description : ''],
      career: [(this.data.career) ? this.data.career : '', Validators.required],
      status: [''],
    });

    this.getListMetrics({ type: 'career' });

    if (this.data.data.status._id === _const.status.active) {
      this.status = true;
    }
  }

  private getListMetrics(body): void {
    this.metricsService.getListMetrics(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listCareers = res.data;
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

      value._id = (this.data.data) ? this.data.data._id : null;
      
      this.subjectsService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
                data: res.data || null,
                code: value.code || null,
                name: value.name || null,
                description: value.description || null,
                career: (res.data.career_id) ? res.data.career_id : null,
                status: (res.data.status) ? res.data.status.label : null,
              }
            );

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
