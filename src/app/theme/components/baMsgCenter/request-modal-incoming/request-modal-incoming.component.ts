import { Component, OnInit } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { RequestsService } from '../../../../services/requests.service';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-request-modal-incoming',
  templateUrl: './request-modal-incoming.component.html',
  styleUrls: ['./request-modal-incoming.component.scss']
})
export class RequestModalIncomingComponent implements OnInit {
  data: any;
  modalHeader: string;

  constructor(
    private activeModal: NgbActiveModal,
    private _notificationsService: NotificationsService,
    private requestsService: RequestsService,
  ) { }

  ngOnInit() {
  }

  approved() {
    let message = '';

    this.data.state = _const.status.approved;

    this.requestsService.updateState(this.data)
      .subscribe(res => {
        if (res.success) {
          if (res.data) {
            message = res.message;
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

  notapproved() {
    let message = '';

    this.data.state = _const.status.notapproved;

    this.requestsService.updateState(this.data)
      .subscribe(res => {
        if (res.success) {
          if (res.data) {
            message = res.message;
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
