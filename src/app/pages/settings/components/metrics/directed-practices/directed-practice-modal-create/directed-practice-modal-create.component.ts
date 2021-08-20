import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { MetricsService } from '../../../../../../services/metrics.service';

import { _const } from '../../../../../../commons/constants';

@Component({
  selector: 'nga-app-directed-practice-modal-create',
  templateUrl: './directed-practice-modal-create.component.html',
  styleUrls: ['./directed-practice-modal-create.component.scss']
})
export class DirectedPracticeModalCreateComponent implements OnInit {
  modalHeader: string;
  formDirectedPractice: FormGroup;
  listCareers: Array<any>;
  listPracticalTypes: Array<any>;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.formDirectedPractice = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      career: ['', Validators.required],
      practical_type: ['', Validators.required],
      type: ['directed_practice', Validators.required],
    });

    this.getListMetrics({ type: 'career' });
    this.getListMetrics({ type: 'practical_type' });
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

              case 'practical_type':
                this.listPracticalTypes = res.data;
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
              name: value.name || null,
              description: value.description || null,
              career: (res.data.metric_rel) ? res.data.metric_rel.career.name : null,
              practical_type: (res.data.metric_rel) ? res.data.metric_rel.practical_type.name : null,
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
