import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { RequestsService } from '../../../../../services/requests.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-request-modal-on-waiting',
  templateUrl: './request-modal-on-waiting.component.html',
  styleUrls: ['./request-modal-on-waiting.component.scss']
})
export class RequestModalOnWaitingComponent implements OnInit {
  data: any;
  modalHeader: string;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private _notificationsService: NotificationsService,
    private requestsService: RequestsService,
  ) { }

  ngOnInit() {
  }

  approved() {
    let message = '';
    const request = this.data.data;

    request.state = _const.status.approved;

    this.requestsService.updateState(request)
      .subscribe(res => {
        if (res.success) {
          if (res.data) {
            message = res.message;

            this.source.update(
              this.data,
              {
                data: res.data || null,
                consecutive: res.data.consecutive || null,
                user_id: (res.data.user_id) ? res.data.user_id.full_names : null,
                user_receives: (res.data.user_receives) ? res.data.user_receives.full_names : null,
                laboratory_id: (res.data.laboratory_id) ? res.data.laboratory_id.name : null,
                practice_type: (res.data.practice_type) ? res.data.practice_type.name : null,
                state: res.data.state ? res.data.state.label : null,
              });

            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitosa', res.message);
          } else {
            message = 'Por favor, dirígete al módulo de solicitudes y verifica el estado de la solicitud';
            this.activeModal.close();
            this._notificationsService.info('Sin resultados', message);
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

  notapproved() {
    let message = '';
    const request = this.data.data;

    request.state = _const.status.notapproved;

    this.requestsService.updateState(request)
      .subscribe(res => {
        if (res.success) {
          if (res.data) {
            message = res.message;

            this.source.update(
              this.data,
              {
                data: res.data || null,
                consecutive: res.data.consecutive || null,
                user_id: (res.data.user_id) ? res.data.user_id.full_names : null,
                user_receives: (res.data.user_receives) ? res.data.user_receives.full_names : null,
                laboratory_id: (res.data.laboratory_id) ? res.data.laboratory_id.name : null,
                practice_type: (res.data.practice_type) ? res.data.practice_type.name : null,
                state: res.data.state ? res.data.state.label : null,
              });

            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitosa', message);
          } else {
            message = 'Por favor, dirígete al módulo de solicitudes y verifica el estado de la solicitud';
            this.activeModal.close();
            this._notificationsService.info('Sin resultados', message);
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

  closeModal() {
    this.activeModal.close();
  }

}
