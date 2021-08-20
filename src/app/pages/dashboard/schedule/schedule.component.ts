import { Component, OnInit } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { ConstantsService } from '../../../services/constants.service';
import { MetricsService } from '../../../services/metrics.service';
import { SchedulesService } from '../../../services/schedules.service';

import { _const } from '../../../commons/constants';

@Component({
  selector: 'nga-app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  listCareers: Array<any>;
  listDays: Array<any>;
  listHours: Array<any>;
  listLaboratories: Array<any>;
  listSchedules: Array<any>;

  constructor(
    private constantsService: ConstantsService,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
    private schedulesService: SchedulesService,
  ) { }

  ngOnInit() {
    this.getListByFather({ father: _const.fathers.days });
    this.getListByFather({ father: _const.fathers.blocks });
    this.getListMetrics({ type: 'laboratory' });
    this.getAll();
  }

  private getAll(): void {
    this
      .schedulesService
      .getAll()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listSchedules = res.data;
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

  private getListByFather(body): void {
    this
      .constantsService
      .getListByFather(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (body.father) {
              case _const.fathers.days:
                this.listDays = res.data;
                break;
              
              case _const.fathers.blocks:
                this.listHours = res.data;
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

  private getListMetrics(body): void {
    this.metricsService.getListMetrics(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (body.type) {
              case 'career':
                this.listCareers = res.data;
                break;

              case 'laboratory':
                this.listLaboratories = res.data;
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

}
