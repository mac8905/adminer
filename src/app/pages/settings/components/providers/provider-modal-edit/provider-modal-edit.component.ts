import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';
import { ProvidersService } from '../../../../../services/providers.service';

const now = new Date();

@Component({
  selector: 'nga-app-provider-modal-edit',
  templateUrl: './provider-modal-edit.component.html',
  styleUrls: ['./provider-modal-edit.component.scss']
})
export class ProviderModalEditComponent implements OnInit {
  data: any;
  date: NgbDateStruct;
  meridian = true;
  modalHeader: string;
  formProvider: FormGroup;
  source: LocalDataSource;
  time: any;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private providersService: ProvidersService,
  ) { }

  ngOnInit() {
    this.dateInit();

    this.formProvider = this.fb.group({
      _id: [(this.data._id) ? this.data._id : ''],
      name: [(this.data.name) ? this.data.name : '', Validators.required],
      supply: [(this.data.supply) ? this.data.supply : ''],
      importance: [(this.data.importance) ? this.data.importance : '', Validators.required],
      city: [(this.data.city) ? this.data.city : ''],
      address: [(this.data.address) ? this.data.address : ''],
      email: [(this.data.email) ? this.data.email : '', [Validators.required, Validators.email]],
      phone: this.fb.group({
        mobile: [(this.data.phone.mobile) ? this.data.phone.mobile : ''],
        fixed: [(this.data.phone.fixed) ? this.data.phone.fixed : ''],
      }),
      status: [(this.data.status) ? this.data.status : ''],
      selection: this.fb.group({
        date: [''],
        time: [''],
        value_r: [(this.data.selection.value_r) ? this.data.selection.value_r : ''],
        criterion_r: [(this.data.selection.criterion_r) ? this.data.selection.criterion_r : ''],
        observation: [(this.data.selection.observation) ? this.data.selection.observation : ''],
      }),
    });
  }

  dateInit() {
    if (
      this.data.selection.date !== undefined &&
      this.data.selection.date !== null &&
      this.data.selection.date !== ''
    ) {
      const _date = new Date(this.data.selection.date);

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
      value.selection.date = this.getDatetime(value.selection.date, value.selection.time).toISOString();

      this.providersService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
                _id: value._id || null,
                name: value.name || null,
                supply: value.supply || null,
                importance: value.importance || null,
                city: value.city || null,
                address: value.address || null,
                phone: value.phone || null,
                mobile: (value.phone) ? value.phone.mobile : null,
                email: value.email || null,
                status: value.status || null,
                selection: value.selection || null,
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
