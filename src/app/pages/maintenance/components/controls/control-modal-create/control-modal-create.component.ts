import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { ConstantsService } from '../../../../../services/constants.service';
import { ControlsService } from '../../../../../services/controls.service';
import { StocksService } from '../../../../../services/stocks.service';
import { UsersService } from '../../../../../services/users.service';
import { TimeService } from '../../../../../services/time.service';

import { _const } from '../../../../../commons/constants';

const now = new Date();

@Component({
  selector: 'nga-app-control-modal-create',
  templateUrl: './control-modal-create.component.html',
  styleUrls: ['./control-modal-create.component.scss']
})
export class ControlModalCreateComponent implements OnInit {
  date: NgbDateStruct;
  meridian = true;
  form: FormGroup;
  modalHeader: string;
  listControlConstants : Array<any>;
  listStocks: Array<any>;
  listUsers : Array<any>;
  source: LocalDataSource;
  time: any;

  constructor(
    private activeModal: NgbActiveModal,
    private constantsService: ConstantsService,
    private controlsService: ControlsService,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private stocksService: StocksService,
    private timeService: TimeService,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.date = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    this.time = { hour: now.getHours(), minute: now.getMinutes() };
    
    this.form = this.fb.group({
      date: [''],
      time: [''],
      stocks_id: ['', Validators.required],
      check_id: ['', Validators.required],
      user_id: ['', Validators.required],
    });

    this.getAllStocks();
    this.getAllUsers();
    this.getControlConstants({ father: _const.fathers.control });
  }

  private getAllStocks(): void {
    let message = '';

    this.stocksService
      .getAll()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listStocks = res.data;
          } else {
            message = 'El inventario esta vacío, por favor ve al módulo de configuración de inventarios.';
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

  private getControlConstants(body): void {
    this
      .constantsService
      .getListByFather(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (body.father) {
              case _const.fathers.control:
                this.listControlConstants = res.data;
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
      value.type = _const.maintenance.corrective;
      value.date_schedules = this.timeService.getDatetime(value.date, value.time).toISOString();
      
      this.controlsService.create(value)
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
              check_id: (res.data.check_id) ? res.data.check_id.label : null,
              date_schedules: (res.data.date_schedules) ? new DatePipe('en-US').transform(res.data.date_schedules, 'yyyy/MM/dd hh:mm a') : null,
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
