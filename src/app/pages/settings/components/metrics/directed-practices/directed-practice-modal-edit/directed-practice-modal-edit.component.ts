import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { MetricsService } from '../../../../../../services/metrics.service';

import { _const } from '../../../../../../commons/constants';

@Component({
  selector: 'nga-app-directed-practice-modal-edit',
  templateUrl: './directed-practice-modal-edit.component.html',
  styleUrls: ['./directed-practice-modal-edit.component.scss']
})
export class DirectedPracticeModalEditComponent implements OnInit {
  data: any;
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
      name: [(this.data.name) ? this.data.name : '', Validators.required],
      description: [(this.data.description) ? this.data.description : ''],
      career: [
        (this.data.data.metric_rel.career) ? this.data.data.metric_rel.career._id : '',
        Validators.required
      ],
      practical_type: [
        (this.data.data.metric_rel.practical_type) ? this.data.data.metric_rel.practical_type._id : '',
        Validators.required
      ],
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
                name: value.name || null,
                description: value.description || null,
                career: (res.data.metric_rel) ? res.data.metric_rel.career.name : null,
                practical_type: (res.data.metric_rel) ? res.data.metric_rel.practical_type.name : null,
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
