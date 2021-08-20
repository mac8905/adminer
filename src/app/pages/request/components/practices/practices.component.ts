import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { PracticeModalOnWaitingComponent } from './practice-modal-on-waiting/practice-modal-on-waiting.component';
import { PracticeModalInProcessComponent } from './practice-modal-in-process/practice-modal-in-process.component';

import { PracticesService } from '../../../../services/practices.service';
import { TimeService } from '../../../../services/time.service';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-app-practices',
  templateUrl: './practices.component.html',
  styleUrls: ['./practices.component.scss']
})
export class PracticesComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private now: Date;
  private smartTablesComponent: SmartTablesComponent;
  private semester: string;
  private year: number;
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
        title: '# Préstamo',
        type: 'number',
      },
      laboratory_id: {
        title: 'Laboratorio',
        type: 'string',
      },
      subject_id: {
        title: 'Materia',
        type: 'string',
      },
      update: {
        title: 'Actualización',
        type: 'date',
      },
      status: {
        title: 'Estado',
        type: 'string',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private practicesService: PracticesService,
    private timeService: TimeService,
  ) {
    this.now = new Date();
    this.year = this.now.getFullYear();
    this.semester = this.timeService.getCurrentSemester(this.now);
  }

  ngOnInit() {
    this.getAll({ semester: this.semester, year: this.year });
  }

  private getAll(body): void {
    this.practicesService.getAllRequestPractice(body)
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                data: element || '',
                consecutive: (element.requests_id) ? element.requests_id.consecutive : '',
                laboratory_id: (element.requests_id) ? element.requests_id.laboratory_id.name : '',
                subject_id: (element.subject_id) ? element.subject_id.name : '',
                update: (element.update) ? new DatePipe('en-US').transform(element.update, 'yyyy/MM/dd hh:mm a') : null,
                status: (element.status) ? element.status.label : '',
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
    if (event.data.data.status._id === _const.status.waiting) {
      const activeModal = this.modalService.open(PracticeModalOnWaitingComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = `SOLICITUD DE MATERIALES N°: ${event.data.data.requests_id.consecutive}`;
      activeModal.componentInstance.source = this.source;
      activeModal.componentInstance.data = event.data;
    } else if (event.data.data.status._id === _const.status.inprocess) {
      const activeModal = this.modalService.open(PracticeModalInProcessComponent, { size: 'lg' });
      activeModal.componentInstance.modalHeader = `SOLICITUD DE MATERIALES N°: ${event.data.data.requests_id.consecutive}`;
      activeModal.componentInstance.source = this.source;
      activeModal.componentInstance.data = event.data;
    }
  }

  onDelete(event: any) {
    const data = event.data.data;
    const doc = new jsPDF();
    const udImg = new Image();
    const lbImg = new Image();
    const dateCreated = new Date(data.requests_id.date_created);
    const dateRequest = new Date(data.requests_id.date_request);

    udImg.src = '../../../../../assets/img/ud.png';
    lbImg.src = '../../../../../assets/img/laboratory.png';

    udImg.onload = () => {
      lbImg.onload = () => {
        doc.rect(9, 15, 190, 15, 'S');
        doc.rect(49, 15, 0, 15, 'S');
        doc.rect(120, 15, 0, 15, 'S');
        doc.rect(160, 15, 0, 15, 'S');
        doc.rect(49, 20, 111, 0, 'S');
        doc.rect(49, 25, 111, 0, 'S');
        doc.addImage(udImg, 'png', 8, 14, 41, 16);
        doc.addImage(lbImg, 'png', 173, 16, 12, 12);
        doc.setFontType('bold');
        doc.setFontSize(6);
        doc.text('FORMATO DE SOLICITUD DE MATERIAL', 64, 18.5);
        doc.text('Macroproceso: Gestión de Laboratorios', 64.5, 23.5);
        doc.text('Proceso: Gestión de Prácticas', 69.5, 28.5);
        doc.text('FR-GP-01', 136, 18.5);
        doc.text('Versión: 0', 135, 23.5);
        doc.text('Página 1 de 1', 134, 28.5);

        doc.rect(9, 33, 190, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 33, 40, 6, 'FD');
        doc.text('NOMBRE DE LA PRÁCTICA:', 10, 37);
        doc.setFontType('normal');
        doc.text((data.requests_id) ? data.requests_id.practice_name.toUpperCase() : '', 50, 37);

        doc.setFillColor(229, 229, 229);
        doc.rect(9, 40, 190, 6, 'FD');
        doc.setFontType('bold');
        doc.text('TIPO DE PRÁCTICA', 90, 44);

        doc.rect(9, 46, 190, 6, 'S');
        doc.setFontType('normal');
        doc.text(((data.requests_id.practice_type) ? data.requests_id.practice_type.name : '').toUpperCase(), 10, 50);

        doc.rect(9, 53, 190, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 53, 41, 6, 'FD');
        doc.setFontType('bold');
        doc.text('UNIVERSIDAD A LA QUE PERTENECE', 10, 57);
        doc.setFontType('normal');
        doc.text(data.university.toUpperCase(), 51, 57);

        doc.rect(9, 60, 190, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 60, 23, 6, 'FD');
        doc.setFillColor(229, 229, 229);
        doc.rect(50, 60, 26, 6, 'FD');
        doc.setFillColor(229, 229, 229);
        doc.rect(90, 60, 30, 6, 'FD');
        doc.setFontType('bold');
        doc.text('Fecha de la práctica:', 10, 63.5);
        doc.text('Hora de la práctica', 53.5, 63.5);
        doc.text('Asignatura', 99.5, 63.5);
        doc.setFontType('normal');
        doc.text(this.timeService.getPrintDate(dateRequest), 33, 63.7);
        doc.text(data.requests_id.hour.label, 77, 63.7);
        doc.text(data.subject_id.name.toUpperCase(), 121, 63.7);

        doc.rect(9, 67, 190, 6, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 67, 46, 6, 'FD');
        doc.setFontType('bold');
        doc.text('NOMBRE DOCENTE O GUÍA DE PRÁCTICA', 10, 70.5);
        doc.setFontType('normal');
        doc.text(((data.requests_id.practice_guided) ? data.requests_id.practice_guided.name : '').toUpperCase(), 56, 70.7);

        doc.rect(9, 76, 190, 36, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 76, 190, 6, 'FD');
        doc.rect(74, 76, 0, 36, 'S');
        doc.rect(104, 76, 0, 36, 'S');
        doc.rect(134, 76, 0, 36, 'S');
        doc.rect(9, 82, 190, 0, 'S');
        doc.rect(9, 88, 190, 0, 'S');
        doc.rect(9, 94, 190, 0, 'S');
        doc.rect(9, 100, 190, 0, 'S');
        doc.rect(9, 106, 190, 0, 'S');
        doc.setFontType('bold');
        doc.text('Nombre', 37, 80);
        doc.text('Código', 85, 80);
        doc.text('Proyecto curricular', 109, 80);
        doc.text('Correo electrónico', 157, 80);
        doc.setFontType('normal');
        
        if (data.users && data.users.length > 0) {
          let y = 85.5;

          data.users.forEach(element => {
            doc.text((element.full_names) ? element.full_names : '', 10, y);
            doc.text((element.username) ? element.username : '', 75, y);
            doc.text((element.career) ? element.career.name : '', 105, y);
            doc.text((element.email) ? element.email : '', 135, y);

            y+= 6;
          });
        }

        doc.setFontType('bold');
        doc.text('MATERIALES, EQUIPOS E INSUMOS', 85, 116);

        doc.rect(9, 118, 190, 66, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 118, 190, 6, 'FD');
        doc.rect(56.5, 118, 0, 66, 'S');
        doc.rect(104, 118, 0, 66, 'S');
        doc.rect(151.5, 118, 0, 66, 'S');
        doc.rect(9, 130, 190, 0, 'S');
        doc.rect(9, 136, 190, 0, 'S');
        doc.rect(9, 142, 190, 0, 'S');
        doc.rect(9, 148, 190, 0, 'S');
        doc.rect(9, 154, 190, 0, 'S');
        doc.rect(9, 160, 190, 0, 'S');
        doc.rect(9, 166, 190, 0, 'S');
        doc.rect(9, 172, 190, 0, 'S');
        doc.rect(9, 178, 190, 0, 'S');
        doc.setFontType('bold');
        doc.text('Materiales, equipos e insumos', 17, 121.5);
        doc.text('Quien entrega', 72.5, 121.5);
        doc.text('Materiales, equipos e insumos', 112, 121.5);
        doc.text('Quien recibe', 168, 121.5);
        doc.setFontType('normal');

        if (data.equipment && data.equipment.length > 0) {
          let y = 127.5;

          data.equipment.forEach(element => {
            doc.text((element.equipment) ? element.equipment : '', 10, y);
            doc.text((data.delivery) ? data.delivery.full_names : '', 57.5, y);
            doc.text((element.equipment) ? element.equipment : '', 105, y);
            doc.text((data.requests_id.user_id) ? `${data.requests_id.user_id.username} - ${data.requests_id.user_id.full_names}` : '', 152.5, y);

            y+= 6;
          });
        }

        doc.rect(9, 185, 190, 24, 'S');
        doc.setFillColor(229, 229, 229);
        doc.rect(9, 185, 190, 6, 'FD');
        doc.rect(9, 197, 190, 0, 'S');
        doc.rect(9, 203, 190, 0, 'S');
        doc.setFontType('bold');
        doc.text('OBSERVACIONES', 95, 188.7);
        doc.setFontType('normal');
        doc.text((data.observation) ? data.observation : '', 10, 194.7);

        doc.rect(9, 212, 190, 6, 'S');
        doc.rect(71.3, 212, 0, 6, 'S');
        doc.text('NOMBRE Y FIRMA DEL COORDINADOR DE LABORATORIO', 10, 215.7);

        doc.save(`SOLICITUD_MATERIALES_${this.timeService.getPrintDate(dateRequest)}_${data.requests_id.hour.label}.pdf`);
      };
    };
  }

}