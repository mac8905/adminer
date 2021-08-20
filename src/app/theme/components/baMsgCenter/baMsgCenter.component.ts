import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { RequestModalIncomingComponent } from './request-modal-incoming/request-modal-incoming.component';

import { BaMsgCenterService } from './baMsgCenter.service';
import { RequestsService } from '../../../services/requests.service';

import { environment } from '../../../../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter implements OnInit {
  public notifications: Array<any>;
  public messages: Array<any>;
  socket: any;
  date: NgbDateStruct;
  time: any;

  constructor(
    private _baMsgCenterService: BaMsgCenterService,
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private requestsService: RequestsService,
  ) {
    this.socket = io(environment.socket.baseUrl, environment.socket.opts);
    this.notifications = this._baMsgCenterService.getNotifications();
    this.messages = this._baMsgCenterService.getMessages();
  }

  ngOnInit() {
    this.getReqAutPresent();

    this.socket.on('requests.create', (source) => {
      if (source.success) {
        this.requestIncoming(source.data);
      }
    });
  }

  private getReqAutPresent(): void {
    let message = '';

    this.requestsService.getReqAutPresent()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            res.data.forEach(element => {
              this.notifications.push({
                data: element,
                name: (element.user_id) ? element.user_id.full_names : '',
                text: `${element.laboratory_id.name} -  ${element.practice_type.name}`,
                time: new DatePipe('en-US').transform(element.date_request, 'yyyy/MM/dd hh:mm a'),
              });
            });
          } else {
            message = 'No hay solicitudes pendientes por aprobar';
            this._notificationsService.info('Información', message);
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

  requestIncoming(data) {
    const activeModal = this.modalService.open(RequestModalIncomingComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'SOLICITUD DE PRÉSTAMO ENTRANTE';
    activeModal.componentInstance.data = data;
  }

}
