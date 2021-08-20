import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';
import { RoutesService } from '../../../../services/routes.service';
import { UsersService } from '../../../../services/users.service';
import { RoutesInterface } from '../../../../interfaces/routes';
import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-routes-settings',
  templateUrl: './routes.html',
  styleUrls: ['./routes.scss'],
})
export class RoutesComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private smartTablesComponent: SmartTablesComponent;
  private user: any;

  settings = {
    actions: {
      columnTitle: 'Acciones',
    },
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 10,
    },
    noDataMessage: 'No hay registros',
    columns: {
      url: {
        title: 'URL',
        type: 'string',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      status: {
        title: 'Estado',
        editor: {
          type: 'checkbox',
          config: {
            true: 'active',
            false: 'inactive',
          },
        },
      },
    },
  };

  source: LocalDataSource;

  constructor(
    private _notificationsService: NotificationsService,
    private routesService: RoutesService,
    private usersService: UsersService
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  public ngOnInit(): void {
    this.getAll();
  }

  private getAll(): void {
    this.routesService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                _id: element._id || null,
                url: element.url || null,
                description: element.description || null,
                status: (element.status) ? element.status.name : null,
              });
            });
          } else {
            this._notificationsService.info('No hay registros');
          }

          this.source = new LocalDataSource(data);
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  public onConfirmCreate(event): void {
    const newData: RoutesInterface = event.newData;

    if (
      newData !== null &&
      newData !== undefined
    ) {
      if (
        newData.url !== null &&
        newData.url !== undefined &&
        newData.url !== ''
      ) {
        newData['creator'] = this.user._id;

        if (newData.status === 'active') {
          newData.status = _const.status.active;
        } else {
          newData.status = _const.status.inactive;
        }

        this.routesService.create(newData)
          .subscribe(res => {
            if (res.success) {
              this._notificationsService.success('Transacción exitósa', res.message);
              event.confirm.resolve();
              event.source.refresh();
            } else {
              this._notificationsService.error('Transacción fallida', res.message);
              event.confirm.reject();
            }

          }, error => {
            this._notificationsService.error('Transacción fallida', error);
            event.confirm.reject();
          });
      } else {
        this._notificationsService.info(
          'Campo requerido',
          'El campo url es obligatorio.',
        );
        event.confirm.reject();
      }
    } else {
      this._notificationsService.warn(
        'Transacción fallida',
        'El registro no fue creado. Por favor, intenta nuevamente.',
      );
      event.confirm.reject();
    }
  }

  public onConfirmEdit(event): void {
    const newData: RoutesInterface = event.newData;

    if (
      newData !== null &&
      newData !== undefined
    ) {
      if (
        newData.url !== null &&
        newData.url !== undefined &&
        newData.url !== ''
      ) {
        newData['creator'] = this.user._id;

        if (newData.status === 'active') {
          newData.status = _const.status.active;
        } else {
          newData.status = _const.status.inactive;
        }

        this.routesService.update(newData)
          .subscribe(res => {
            if (res.success) {
              this._notificationsService.success('Transacción exitósa', res.message);
              event.confirm.resolve();
              event.source.refresh();
            } else {
              this._notificationsService.error('Transacción fallida', res.message);
              event.confirm.reject();
            }

          }, error => {
            this._notificationsService.error('Transacción fallida', error);
            event.confirm.reject();
          });
      } else {
        this._notificationsService.info(
          'Campo requerido',
          'El campo url es obligatorio.',
        );
        event.confirm.reject();
      }
    } else {
      this._notificationsService.warn(
        'Transacción fallida',
        'El registro no fue editado. Por favor, intenta nuevamente.',
      );
      event.confirm.reject();
    }
  }

  public onConfirmDelete(event): void {
    const data: RoutesInterface = event.data;

    if (
      data !== null &&
      data !== undefined
    ) {
      if (
        data.url !== null &&
        data.url !== undefined &&
        data.url !== ''
      ) {
        data['creator'] = this.user._id;

        this.routesService.delete(data)
          .subscribe(res => {
            if (res.success) {
              this._notificationsService.success('Transacción exitósa', res.message);
              event.confirm.resolve();
              event.source.refresh();
            } else {
              this._notificationsService.error('Transacción fallida', res.message);
              event.confirm.reject();
            }
          }, error => {
            this._notificationsService.error('Transacción fallida', error);
            event.confirm.reject();
          });
      } else {
        this._notificationsService.info(
          'Campo requerido',
          'El campo url es obligatorio.',
        );
        event.confirm.reject();
      }
    } else {
      this._notificationsService.warn(
        'Transacción fallida',
        'El registro no fue eliminado. Por favor, intenta nuevamente.',
      );
      event.confirm.reject();
    }
  }

}
