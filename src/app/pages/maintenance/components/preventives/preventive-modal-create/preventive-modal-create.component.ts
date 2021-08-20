import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { ControlsService } from '../../../../../services/controls.service';
import { MaintenancesService } from '../../../../../services/maintenances.service';
import { UsersService } from '../../../../../services/users.service';
import { TimeService } from '../../../../../services/time.service';

import { _const } from '../../../../../commons/constants';

const now = new Date();

@Component({
  selector: 'nga-app-preventive-modal-create',
  templateUrl: './preventive-modal-create.component.html',
  styleUrls: ['./preventive-modal-create.component.scss']
})
export class PreventiveModalCreateComponent implements OnInit {
  date: NgbDateStruct;
  meridian = true;
  stock: any;
  form: FormGroup;
  modalHeader: string;
  listControls: Array<any>;
  listStocks: Array<any>;
  listUsers: Array<any>;
  source: LocalDataSource;
  time: any;

  constructor(
    private activeModal: NgbActiveModal,
    private controlsService: ControlsService,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private maintenancesService: MaintenancesService,
    private usersService: UsersService,
    private timeService: TimeService,
  ) { }

  ngOnInit() {
    this.date = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.time = { hour: now.getHours(), minute: now.getMinutes() };

    this.form = this.fb.group({
      date: [''],
      time: [''],
      stocks_id: ['', Validators.required],
      controls_id: ['', Validators.required],
      fault: ['', Validators.required],
      solution: ['', Validators.required],
      spare_parts: ['', Validators.required],
      user_id: ['', Validators.required],
    });

    this.getAllControls();
    this.getAllUsers();
  }

  private getAllControls(): void {
    let message = '';

    this.controlsService
      .getStatus()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listControls = res.data;
          } else {
            message = 'No hay controles activos, por favor ve al módulo de controles.';
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

  private getAllUsers(): void {
    let message = '';

    this.usersService
      .getByProfile(_const.profiles.laboratorist)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listUsers = res.data;
          } else {
            message = 'No hay usuarios laboratoristas, por favor ve al módulo de configuración de usuarios.';
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

  public setStock(event): void {
    if (
      event !== undefined &&
      event !== null &&
      event !== ''
    ) {
      let control = this.listControls.find((item) => {
        return item._id === event;
      });
      
      if (
        control !== undefined &&
        control !== null
      ) {
        this.stock = control.stocks_id;
      }
    }
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
      value.type = _const.maintenance.preventive;
      value.date = this.timeService.getDatetime(value.date, value.time).toISOString();
      value.stocks_id = this.stock._id;

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
