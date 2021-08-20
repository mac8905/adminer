import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProviderModalCreateComponent } from './provider-modal-create/provider-modal-create.component';
import { ProviderModalEditComponent } from './provider-modal-edit/provider-modal-edit.component';
import { ProviderModalDeleteComponent } from './provider-modal-delete/provider-modal-delete.component';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';

import { NotificationsService } from 'angular2-notifications';
import { ProvidersService } from '../../../../services/providers.service';
import { UsersService } from '../../../../services/users.service';

import { _const } from '../../../../commons/constants';

/**
 * https://plnkr.co/edit/lGP4XsO64gjgnTg9Qpvn?p=preview
 */
@Component({
  selector: 'nga-app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private smartTablesComponent: SmartTablesComponent;
  source: LocalDataSource = new LocalDataSource();
  private user: any;
  settings = {
    mode: 'external',
    actions: {
      columnTitle: 'Acciones',
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    noDataMessage: 'No hay registros',
    columns: {
      name: {
        title: 'Nombre',
        type: 'string',
      },
      supply: {
        title: 'Bien o servicio',
        type: 'string',
      },
      importance: {
        title: 'Importancia',
        type: 'string',
      },
      address: {
        title: 'Dirección',
        type: 'string',
      },
      mobile: {
        title: 'Móvil',
        type: 'string',
      },
      status: {
        title: 'Estado actual',
        type: 'string',
      },
    },
  };

  constructor(
    private modalService: NgbModal,
    private _notificationsService: NotificationsService,
    private providersService: ProvidersService,
    private usersService: UsersService,
  ) {
    this.user = (this.usersService.getCurrentUser()) ? this.usersService.getCurrentUser() : null;
  }

  ngOnInit() {
    this.getAll();
  }

  private getAll(): void {
    this.providersService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                _id: element._id || null,
                name: element.name || null,
                supply: element.supply || null,
                importance: element.importance || null,
                city: element.city || null,
                address: element.address || null,
                phone: element.phone || null,
                mobile: (element.phone) ? element.phone.mobile : null,
                email: element.email || null,
                status: element.status || null,
                selection: element.selection || null,
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

  onCreate(event: any) {
    const activeModal = this.modalService.open(ProviderModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(ProviderModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(ProviderModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
