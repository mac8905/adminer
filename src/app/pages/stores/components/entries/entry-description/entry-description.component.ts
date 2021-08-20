import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MetricsService } from '../../../../../services/metrics.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'nga-app-entry-description',
  templateUrl: './entry-description.component.html',
  styleUrls: ['./entry-description.component.scss']
})
export class EntryDescriptionComponent implements OnInit {
  @Input('group')
  public entryDescriptionForm: FormGroup;
  metrics: Array<any>;

  constructor(
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.getListMetrics({type: 'location'});
  }

  private getListMetrics(type): void {
    let message = '';

    this.metricsService.getListMetrics(type)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.metrics = res.data;
          } else {
            message = 'No hay ubicaciones, por favor ve al módulo de configuración de métricas';
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

}