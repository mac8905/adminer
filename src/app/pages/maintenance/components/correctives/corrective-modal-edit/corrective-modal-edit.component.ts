import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { MaintenancesService } from '../../../../../services/maintenances.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-corrective-modal-edit',
  templateUrl: './corrective-modal-edit.component.html',
  styleUrls: ['./corrective-modal-edit.component.scss']
})
export class CorrectiveModalEditComponent implements OnInit {
  form: FormGroup;
  modalHeader: string;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private maintenancesService: MaintenancesService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      stocks_id: ['', Validators.required],
      date: ['', Validators.required],
      fault: ['', Validators.required],
      solution: ['', Validators.required],
      spare_parts: ['', Validators.required],
      user_id: ['', Validators.required],
      status: ['', Validators.required],
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

      this.maintenancesService.create(value)
        .subscribe(res => {
          if (res.success && res.data) {
            let status = null;
            
            if (res.data.status && res.data.status._id === _const.status.active) {
              status = `<b class="text-success">${res.data.status.label}</b>`;
            } else if (res.data.status && res.data.status._id === _const.status.inactive) {
              status = `<b class="text-warning">${res.data.status.label}</b>`;
            } else if (res.data.status && res.data.status._id === _const.status.executed) {
              status = `<b class="text-info">${res.data.status.label}</b>`;
            } else if (res.data.status && res.data.status._id === _const.status.delete) {
              status = `<b class="text-danger">${res.data.status.label}</b>`;
            }
            
            this.source.add({
              data: res.data || null,
              stocks_id: (res.data.stocks_id) ? res.data.stocks_id.equipment : null,
              date: (res.data.date) ? new DatePipe('en-US').transform(res.data.date, 'yyyy/MM/dd hh:mm a') : null,
              fault: (res.data.fault) ? res.data.fault : null,
              user_id: (res.data.user_id) ? res.data.user_id.full_names : null,
              status: (res.data.status) ? status : null,
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
