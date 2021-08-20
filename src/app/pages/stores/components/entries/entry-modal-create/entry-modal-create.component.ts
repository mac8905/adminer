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
  selector: 'nga-app-entry-modal-create',
  templateUrl: './entry-modal-create.component.html',
  styleUrls: ['./entry-modal-create.component.scss'],
})
export class EntryModalCreateComponent implements OnInit {
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
    this.date = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.time = { hour: now.getHours(), minute: now.getMinutes() };

    this.formEntry = this.fb.group({
      date: [''],
      time: [''],
      username: [''],
      per_delivery: [''],
      entry: [''],
      contract: [''],
      provider_id: [''],
      invoice: ['', Validators.required],
      description: this.fb.array([]),
    });

    this.addDescription();
    this.getAllProviders();
    this.getByProfile('590fddb8b605751ba40ffd9b');
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

  initDescription() {
    return this.fb.group({
      group: [0],
      unity: [0],
      quantity: [0],
      description: [''],
      location_id: [''],
    });
  }

  getDescriptions(formEntry) {
    return formEntry.get('description').controls;
  }

  addDescription() {
    const control = <FormArray>this.formEntry.controls['description'];
    const descriptionControl = this.initDescription();

    control.push(descriptionControl);
  }

  removeDescription(i: number) {
    const control = <FormArray>this.formEntry.controls['description'];

    control.removeAt(i);
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
      value.date = this.getDatetime(value.date, value.time).toISOString();

      this.entriesService.create(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.add({
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
