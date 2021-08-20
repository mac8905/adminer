import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { RequestModalOnWaitingComponent } from './request-modal-on-waiting/request-modal-on-waiting.component';

import { RequestsService } from '../../../../services/requests.service';
import { TimeService } from '../../../../services/time.service';

import { _const } from '../../../../commons/constants';

const now = new Date();

@Component({
  selector: 'nga-app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private smartTablesComponent: SmartTablesComponent;
  private year: number;
  private semester: string;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
    },
    add: {
      addButtonContent: '<i class=""></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-checkmark-circled"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-android-download"></i>',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    noDataMessage: 'No hay registros',
    columns: {
      consecutive: {
        title: 'Consecutivo',
        type: 'string',
      },
      user_id: {
        title: 'Solicita',
        type: 'string',
      },
      user_receives: {
        title: 'Autoriza',
        type: 'string',
      },
      laboratory_id: {
        title: 'Laboratorio',
        type: 'string',
      },
      practice_type: {
        title: 'Práctica',
        type: 'string',
      },
      state: {
        title: 'Estado',
        type: 'string',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private requestsService: RequestsService,
    private timeService: TimeService,
  ) {
    this.year = now.getFullYear();
    this.semester = this.timeService.getCurrentSemester(now);
  }

  ngOnInit() {
    this.getAll({ semester: this.semester, year: this.year });
  }

  private getAll(body): void {
    this.requestsService.getAllSemester(body)
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                data: element || '',
                consecutive: element.consecutive || '',
                user_id: (element.user_id) ? element.user_id.full_names : '',
                user_receives: (element.user_receives) ? element.user_receives.full_names : '',
                laboratory_id: (element.laboratory_id) ? element.laboratory_id.name : '',
                practice_type: (element.practice_type) ? element.practice_type.name : '',
                state: (element.state) ? element.state.label : '',
              });
            });
          } else {
            this._notificationsService.info('No hay registros');
          }

          this.source.load(data);
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  onSave(event: any) {
    if (event.data.data.state._id === _const.status.waiting) {
      const activeModal = this.modalService.open(RequestModalOnWaitingComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = 'SOLICITUD DE PRÉSTAMO N°: ';
      activeModal.componentInstance.source = this.source;
      activeModal.componentInstance.data = event.data;
    }
  }

  onDelete(event: any) {
    const data = event.data.data;
    const doc = new jsPDF();
    const udImg = new Image();
    const lbImg = new Image();
    const dateCreated = new Date(data.date_created);
    const dateRequest = new Date(data.date_request);

    udImg.src = '../../../../../assets/img/ud.png';
    lbImg.src = '../../../../../assets/img/laboratory.png';

    udImg.onload = () => {
      lbImg.onload = () => {
        doc.rect(25, 25, 160, 115, 'S');

        doc.rect(25, 45, 160, 0, 'S');
        doc.rect(55, 25, 0, 20, 'S');
        doc.rect(125, 25, 0, 20, 'S');
        doc.rect(155, 25, 0, 20, 'S');
        doc.rect(55, 32, 100, 0, 'S');
        doc.rect(55, 39, 100, 0, 'S');
        doc.addImage(udImg, 'png', 15, 22, 51, 25);
        doc.addImage(lbImg, 'png', 163, 27, 15, 15);
        doc.setFontType('bold');
        doc.setFontSize(9);
        doc.text('SOLICITUD DE PRÁCTICAS', 69, 30);
        doc.setFontType('normal');
        doc.text('Macroproceso: Gestión de Laboratorios', 62, 37);
        doc.text('Proceso: Gestión de Solicitudes', 67, 43);
        doc.setFontType('bold');
        doc.text('FR-GS-01', 133, 30);
        doc.text('Versión: 0', 132, 37);
        doc.text('Página 1 de 1', 130, 43);

        doc.setFillColor(179, 179, 179);
        doc.rect(25, 46, 160, 7, 'FD');
        doc.setFontSize(7);
        doc.text('PERSONA QUIEN SOLICITA LA PRÁCTICA', 75, 51);

        doc.rect(25, 54, 160, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(25, 54, 30, 6, 'FD');
        doc.text('NOMBRE:', 26, 58);
        doc.setFontType('normal');
        doc.text((data.user_id) ? data.user_id.full_names.toUpperCase() : '', 56, 58);

        doc.rect(25, 61, 160, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(25, 61, 30, 6, 'FD');
        doc.rect(120, 61, 30, 6, 'FD');
        doc.rect(160, 61, 0, 6, 'S');
        doc.rect(170, 61, 0, 6, 'S');
        doc.setFontType('bold');
        doc.text('CÉDULA O CÓDIGO:', 26, 65);
        doc.text('FECHA:', 121, 65);
        doc.setFontType('normal');
        doc.text(data.user_id.username, 56, 65);
        doc.text((`0${dateCreated.getDate()}`).slice(-2), 151, 65);
        doc.text((`0${dateCreated.getMonth() + 1}`).slice(-2), 161, 65);
        doc.text(`${dateCreated.getFullYear()}`, 171, 65);

        doc.setFillColor(179, 179, 179);
        doc.rect(25, 68, 160, 7, 'FD');
        doc.setFontType('bold');
        doc.text('TIPO DE PRÁCTICA', 90, 73);

        doc.rect(25, 76, 160, 6, 'S');
        doc.setFontType('normal');
        doc.text(
          `${(data.practice_type) ? data.practice_type.name : ''} - ${(data.practice_guided) ? data.practice_guided.name : ''}`.toUpperCase(),
          26,
          80
        );

        doc.rect(25, 83, 160, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(25, 83, 35, 6, 'FD');
        doc.setFontType('bold');
        doc.text('NOMBRE DE LA PRÁCTICA', 26, 87);
        doc.setFontType('normal');
        doc.text(data.practice_name.toUpperCase(), 61, 87);

        doc.rect(25, 90, 160, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(25, 90, 40, 6, 'FD');
        doc.rect(75, 90, 0, 6, 'S');
        doc.rect(85, 90, 0, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(105, 90, 30, 6, 'FD');
        doc.text('Fecha de solicitud de la práctica', 26, 94);
        doc.text('Hora de la práctica', 106, 94);
        doc.setFontType('normal');
        doc.text((`0${dateRequest.getDate()}`).slice(-2), 66, 94);
        doc.text((`0${dateRequest.getMonth() + 1}`).slice(-2), 76, 94);
        doc.text(`${dateRequest.getFullYear()}`, 86, 94);
        doc.text(data.hour.label, 136, 94);

        doc.setFillColor(179, 179, 179);
        doc.rect(25, 97, 160, 7, 'FD');
        doc.rect(25, 110, 160, 0, 'S');
        doc.rect(25, 116, 160, 0, 'S');
        doc.rect(25, 122, 160, 0, 'S');
        doc.setFontType('bold');
        doc.text('OBSERVACIONES', 92, 101);
        doc.setFontType('normal');
        doc.text(data.observations, 26, 108);

        doc.setFillColor(179, 179, 179);
        doc.rect(25, 123, 160, 7, 'FD');
        doc.rect(55, 130, 0, 10, 'S');
        doc.rect(105, 123, 0, 17, 'S');
        doc.rect(120, 130, 0, 10, 'S');
        doc.rect(165, 130, 0, 10, 'S');
        doc.rect(105, 135, 60, 0, 'S');
        doc.text('USUARIO EXTERNO', 56, 127);
        doc.text('QUIEN RECIBE LA SOLICITUD', 120, 127);
        doc.setFontType('normal');
        doc.text('Firma del solicitante:', 26, 136);
        doc.text('Nombre:', 107, 133);
        doc.text('Cargo:', 107, 138);
        doc.text('Firma:', 166, 133);
        doc.text((data.user_receives) ? data.user_receives.full_names : '', 121, 133);

        doc.save(`SOLICITUD_PRACTICAS_${this.timeService.getPrintDate(dateRequest)}_${data.hour.label}.pdf`);
      };
    };
  }

}
