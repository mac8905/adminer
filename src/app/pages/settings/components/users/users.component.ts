import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';
import { MetricsService } from '../../../../services/metrics.service';
import { ProfilesService } from '../../../../services/profiles.service';
import { UsersService } from '../../../../services/users.service';
import { MetricsInterface } from '../../../../interfaces/metrics';
import { ProfilesInterface } from '../../../../interfaces/profiles';
import { UsersInterface } from '../../../../interfaces/users';
import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-users-settings',
  templateUrl: './users.html',
  styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private listMetrics: Array<MetricsInterface>;
  private listProfiles: Array<ProfilesInterface>;
  private smartTablesComponent: SmartTablesComponent;
  source: LocalDataSource;
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
      username: {
        title: 'Username',
        type: 'string',
      },
      password: {
        title: 'Password',
        type: 'string',
      },
      name: {
        title: 'Nombres',
        type: 'string',
      },
      lastname: {
        title: 'Apellidos',
        type: 'string',
      },
      phone: {
        title: 'Teléfono',
        type: 'string',
      },
      mobile: {
        title: 'Celular',
        type: 'string',
      },
      email: {
        title: 'Correo',
        type: 'string',
      },
      profile: {
        title: 'Perfil',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
      career: {
        title: 'Carrera',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
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

  constructor(
    private _notificationsService: NotificationsService,
    private metricsService: MetricsService,
    private profilesService: ProfilesService,
    private usersService: UsersService,
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  public ngOnInit(): void {
    this.getAll();
    this.getListMetrics({ type: 'career' });
    this.getListProfiles();
  }

  private getAll(): void {
    this.usersService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                _id: element._id || null,
                username: element.username || null,
                password: '******',
                name: element.name || null,
                lastname: element.lastname || null,
                phone: element.phone || null,
                mobile: element.mobile || null,
                email: element.email || null,
                profile: (element.profile) ? element.profile.name : null,
                career: (element.career) ? element.career.name : null,
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

  public getListProfiles(): void {
    this.profilesService.getListProfiles()
      .subscribe(res => {
        if (res.success) {
          this.settings.columns.profile.editor.config.list = new Array();
          this.settings.columns.profile.editor.config.list.push({ value: '', title: 'Selecciona una opción' });

          if (res.data.length > 0) {
            this.listProfiles = res.data;

            res.data.forEach(element => {
              this.settings.columns.profile.editor.config.list.push({
                value: element.name || null,
                title: element.name || null,
              });
            });

            this.settings = Object.assign({}, this.settings);
          } else {
            this._notificationsService.info('No hay registros');
          }
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  public getListMetrics(metric): void {
    this.metricsService.getListMetrics(metric)
      .subscribe(res => {
        if (res.success) {
          this.settings.columns.career.editor.config.list = new Array();
          this.settings.columns.career.editor.config.list.push({ value: '', title: 'Selecciona una opción' });

          if (res.data.length > 0) {
            this.listMetrics = res.data;
            
            res.data.forEach(element => {
              this.settings.columns.career.editor.config.list.push({
                value: element.name || null,
                title: element.name || null,
              });
            });

            this.settings = Object.assign({}, this.settings);
          } else {
            this._notificationsService.info('No hay registros');
          }
        } else {
          this._notificationsService.error('Transacción fallida', res.message);
        }
      }, error => {
        this._notificationsService.error('Transacción fallida', error);
      });
  }

  public onConfirmCreate(event): void {
    const newData: UsersInterface = event.newData;
    const data: UsersInterface = Object.assign({}, event.newData); // clone object

    if (
      newData !== null &&
      newData !== undefined
    ) {
      if (
        newData.username !== null &&
        newData.username !== undefined &&
        newData.username !== ''
      ) {
        data['creator'] = this.user._id;
        newData.password = '******';

        if (newData.status === 'active') {
          data.status = _const.status.active;
          newData.status = 'active';
        } else {
          data.status = _const.status.inactive;
          newData.status = 'inactive';
        }

        if (
          newData.profile !== null &&
          newData.profile !== undefined &&
          newData.profile !== ''
        ) {
          data.profile = this.listProfiles.find(e => { return e.name === newData.profile; })._id;
        }

        if (
          newData.career !== null &&
          newData.career !== undefined &&
          newData.career !== ''
        ) {
          data.career = this.listMetrics.find(e2 => { return e2.name === newData.career; })._id;
        }

        this.usersService.create(data)
          .subscribe(res => {
            if (res.success) {
              event.confirm.resolve(newData);
              this.getListProfiles();
              this.getListMetrics({ type: 'career' });
              event.source.refresh();
              this._notificationsService.success('Transacción exitósa', res.message);
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
          'El campo username es obligatorio.',
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
    const newData: UsersInterface = event.newData;
    const data: UsersInterface = Object.assign({}, event.newData); // clone object

    if (
      newData !== null &&
      newData !== undefined
    ) {
      if (
        newData.username !== null &&
        newData.username !== undefined &&
        newData.username !== ''
      ) {
        newData['creator'] = this.user._id;
        newData.password = '******';

        if (data.password === newData.password) {
          delete data.password;
        }

        if (newData.status === 'active') {
          data.status = _const.status.active;
          newData.status = 'active';
        } else {
          data.status = _const.status.inactive;
          newData.status = 'inactive';
        }

        if (
          newData.profile !== null &&
          newData.profile !== undefined &&
          newData.profile !== ''
        ) {
          data.profile = this.listProfiles.find(e => { return e.name === newData.profile; })._id;
        }

        if (
          newData.career !== null &&
          newData.career !== undefined &&
          newData.career !== ''
        ) {
          data.career = this.listMetrics.find(e => { return e.name === newData.career; })._id;
        }

        this.usersService.update(data)
          .subscribe(res => {
            if (res.success) {
              event.confirm.resolve(newData);
              this.getListProfiles();
              this.getListMetrics({ type: 'career' });
              event.source.refresh();
              this._notificationsService.success('Transacción exitósa', res.message);
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
          'El campo username es obligatorio.',
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
    const data: UsersInterface = event.data;

    if (
      data !== null &&
      data !== undefined
    ) {
      if (
        data.username !== null &&
        data.username !== undefined &&
        data.username !== ''
      ) {
        data['creator'] = this.user._id;

        this.usersService.delete(data)
          .subscribe(res => {
            if (res.success) {
              event.confirm.resolve();
              this.getListProfiles();
              this.getListMetrics({ type: 'career' });
              event.source.refresh();
              this._notificationsService.success('Transacción exitósa', res.message);
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
          'El campo username es obligatorio.',
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
