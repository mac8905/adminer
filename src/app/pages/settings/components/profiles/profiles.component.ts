import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';

import { ProfilesService } from '../../../../services/profiles.service';
import { RoutesService } from '../../../../services/routes.service';
import { UsersService } from '../../../../services/users.service';

import { ProfileModalCreateComponent } from './profile-modal-create/profile-modal-create.component';
import { ProfileModalDeleteComponent } from './profile-modal-delete/profile-modal-delete.component';
import { ProfileModalEditComponent } from './profile-modal-edit/profile-modal-edit.component';

import { ProfilesInterface } from '../../../../interfaces/profiles';
import { RoutesInterface } from '../../../../interfaces/routes';
import { UsersInterface } from '../../../../interfaces/users';

import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-profiles-settings',
  templateUrl: './profiles.html',
  styleUrls: ['./profiles.scss'],
})
export class ProfilesComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private listRoutes: Array<RoutesInterface>;
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
      description: {
        title: 'Descripción',
        type: 'string',
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
    private profilesService: ProfilesService,
    private routesService: RoutesService,
    private usersService: UsersService,
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  public ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.profilesService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                data: element || null,
                name: element.name || null,
                description: element.description || null,
                routes: (element.routes) ? element.routes : null,
                status: (element.status) ? element.status.label : null,
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
    const activeModal = this.modalService.open(ProfileModalCreateComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'AGREGAR';
    activeModal.componentInstance.source = this.source;
  }

  onSave(event: any) {
    const activeModal = this.modalService.open(ProfileModalEditComponent, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'EDITAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

  onDelete(event: any) {
    const activeModal = this.modalService.open(ProfileModalDeleteComponent, { size: 'sm' });
    activeModal.componentInstance.modalHeader = 'ELIMINAR';
    activeModal.componentInstance.source = this.source;
    activeModal.componentInstance.data = event.data;
  }

}
