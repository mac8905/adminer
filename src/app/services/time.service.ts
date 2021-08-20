import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { _const } from '../commons/constants';

@Injectable()
export class TimeService {

  constructor(
    private _notificationsService: NotificationsService,
  ) { }

  public getCurrentSemester(date): string {
    let semester = _const.semesters.first;
    const month = date.getMonth() + 1;

    if (month > 6) {
      semester = _const.semesters.second;
    }

    return semester;
  }

  public getDatetime(date: any, time: any): any {
    return new Date(`${date.year}-${date.month}-${date.day} ${time.hour}:${time.minute}:00`);
  }

  public getPrintDate(date: any): any {
    const day = (`0${date.getUTCDate()}`).slice(-2);
    const month = (`0${date.getUTCMonth() + 1}`).slice(-2);
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  }

}
