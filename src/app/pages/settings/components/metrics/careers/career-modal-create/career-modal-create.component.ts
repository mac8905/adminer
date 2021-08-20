import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { MetricsService } from '../../../../../../services/metrics.service';

import { _const } from '../../../../../../commons/constants';

@Component({
  selector: 'nga-app-career-modal-create',
  templateUrl: './career-modal-create.component.html',
  styleUrls: ['./career-modal-create.component.scss']
})
export class CareerModalCreateComponent implements OnInit {
  modalHeader: string;
  formCareer: FormGroup;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.formCareer = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      type: ['career', Validators.required],
    });
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
      this.metricsService.create(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.add({
              data: res.data || null,
              code: value.code || null,
              name: value.name || null,
              description: value.description || null,
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
