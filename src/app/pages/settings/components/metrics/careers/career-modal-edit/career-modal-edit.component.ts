import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { MetricsService } from '../../../../../../services/metrics.service';

import { _const } from '../../../../../../commons/constants';

@Component({
  selector: 'nga-app-career-modal-edit',
  templateUrl: './career-modal-edit.component.html',
  styleUrls: ['./career-modal-edit.component.scss']
})
export class CareerModalEditComponent implements OnInit {
  data: any;
  formCareer: FormGroup;
  modalHeader: string;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.formCareer = this.fb.group({
      code: [(this.data.code) ? this.data.code : '', Validators.required],
      name: [(this.data.name) ? this.data.name : '', Validators.required],
      description: [(this.data.description) ? this.data.description : ''],
      type: ['career', Validators.required],
    });
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
      value._id = (this.data.data) ? this.data.data._id : null;

      this.metricsService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
                data: res.data || null,
                code: value.code || null,
                name: value.name || null,
                description: value.description || null,
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
