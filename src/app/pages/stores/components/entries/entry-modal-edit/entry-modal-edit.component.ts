import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { EntriesService } from '../../../../../services/entries.service';
import { ProvidersService } from '../../../../../services/providers.service';
import { UsersService } from '../../../../../services/users.service';

const now = new Date();

@Component({
  selector: 'nga-app-entry-modal-edit',
  templateUrl: './entry-modal-edit.component.html',
  styleUrls: ['./entry-modal-edit.component.scss']
})
export class EntryModalEditComponent implements OnInit {
  data: any;
  date: NgbDateStruct;
  meridian = true;
  modalHeader: string;
  formEntry: FormGroup;
  laboratorists: Array<any>;
  providers: Array<any>;
  source: LocalDataSource;
  time: any;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private entriesService: EntriesService,
    private providersService: ProvidersService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.formEntry = this.fb.group({
      _id: [(this.data._id) ? this.data._id : ''],
      date: [''],
      time: [''],
      username: [(this.data._username) ? this.data._username._id : ''],
      per_delivery: [(this.data.per_delivery) ? this.data.per_delivery : ''],
      entry: [(this.data.entry) ? this.data.entry : ''],
      contract: [(this.data.contract) ? this.data.contract : ''],
      provider_id: [(this.data._provider_id) ? this.data._provider_id._id : ''],
      invoice: [(this.data.invoice) ? this.data.invoice : '', Validators.required],
      description: this.fb.array([]),
    });

    this.dateInit();
    this.initDescriptions();
    this.getAllProviders();
    this.getByProfile('590fddb8b605751ba40ffd9b');
  }

  dateInit() {
    if (
      this.data._date !== undefined &&
      this.data._date !== null &&
      this.data._date !== ''
    ) {
      const _date = new Date(this.data._date);

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

  private getAllProviders(): void {
    let message = '';

    this.providersService
      .getAll()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.providers = res.data;
          } else {
            message = 'No hay proveedores, por favor ve al módulo de configuración de proveedores';
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  private getByProfile(id): void {
    let message = '';

    this.usersService.getByProfile(id)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.laboratorists = res.data;
          } else {
            message = 'No hay laboratoristas, por favor ve al módulo de configuración de usuarios';
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  initDescription(data: any) {
    if (
      data._id !== undefined &&
      data._id !== null &&
      data._id !== ''
    ) {
      return this.fb.group({
        _id: [(data._id) ? data._id : null],
        group: [(data.group) ? data.group : 0],
        unity: [(data.unity) ? data.unity : 0],
        quantity: [(data.quantity) ? data.quantity : 0],
        description: [(data.description) ? data.description : ''],
        location_id: [(data.location_id) ? data.location_id : ''],
      });
    } else {
      return this.fb.group({
        group: [(data.group) ? data.group : 0],
        unity: [(data.unity) ? data.unity : 0],
        quantity: [(data.quantity) ? data.quantity : 0],
        description: [(data.description) ? data.description : ''],
        location_id: [(data.location_id) ? data.location_id : ''],
      });
    }
  }

  initDescriptions() {
    if (
      this.data._descriptions !== undefined &&
      this.data._descriptions !== null &&
      this.data._descriptions.length > 0
    ) {
      const control = <FormArray>this.formEntry.controls['description'];

      this.data._descriptions.forEach(element => {
        element.location_id = element.location_id._id;
        const descriptionControl = this.initDescription(element);

        control.push(descriptionControl);
      });
    } else {
      this.addDescription();
    }
  }

  getDescriptions(formEntry) {
    return formEntry.get('description').controls;
  }

  addDescription() {
    const control = <FormArray>this.formEntry.controls['description'];
    const descriptionControl = this.initDescription({
      _id: '',
      group: 0,
      unity: 0,
      quantity: 0,
      description: '',
      location_id: '',
    });

    control.push(descriptionControl);
  }

  removeDescription(i: number) {
    const control = <FormArray>this.formEntry.controls['description'];

    control.removeAt(i);
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
      value.date = this.getDatetime(value.date, value.time).toISOString();

      this.entriesService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
                _id: res.data._id || null,
                invoice: res.data.invoice || null,
                date: (res.data.date) ? new DatePipe('en-US').transform(res.data.date, 'yyyy/MM/dd hh:mm a') : null,
                _date: (res.data.date) ? res.data.date : null,
                username: (res.data.username) ? res.data.username.full_names : null,
                _username: (res.data.username) ? res.data.username : null,
                per_delivery: res.data.per_delivery || null,
                entry: res.data.entry || null,
                provider_id: (res.data.provider_id) ? res.data.provider_id.name : null,
                _provider_id: (res.data.provider_id) ? res.data.provider_id : null,
                contract: res.data.contract || null,
                _descriptions: (res.data.description) ? res.data.description : null,
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
