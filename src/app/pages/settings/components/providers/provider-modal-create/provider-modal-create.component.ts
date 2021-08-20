import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';
import { ProvidersService } from '../../../../../services/providers.service';

const now = new Date();

@Component({
  selector: 'nga-app-provider-modal-create',
  templateUrl: './provider-modal-create.component.html',
  styleUrls: ['./provider-modal-create.component.scss']
})
export class ProviderModalCreateComponent implements OnInit {
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
    this.date = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.time = { hour: now.getHours(), minute: now.getMinutes() };

    this.formProvider = this.fb.group({
      name: ['', Validators.required],
      supply: [''],
      importance: ['', Validators.required],
      city: [''],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: this.fb.group({
        mobile: [''],
        fixed: [''],
      }),
      status: [''],
      selection: this.fb.group({
        date: [''],
        time: [''],
        value_r: [''],
        criterion_r: [''],
        observation: [''],
      }),
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
      value.selection.date = this.getDatetime(value.selection.date, value.selection.time).toISOString();

      this.providersService.create(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.add({
              _id: res.data._id || null,
              name: res.data.name || null,
              supply: res.data.supply || null,
              importance: res.data.importance || null,
              city: res.data.city || null,
              address: res.data.address || null,
              phone: res.data.phone || null,
              mobile: (res.data.phone) ? res.data.phone.mobile : null,
              email: res.data.email || null,
              status: res.data.status || null,
              selection: res.data.selection || null,
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
