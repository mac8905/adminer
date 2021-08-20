import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SmartTablesComponent } from './../../../tables/components/smartTables/smartTables.component';
import { LocalDataSource } from 'ng2-smart-table';
import { NotificationsService } from 'angular2-notifications';
import { ConstantsService } from '../../../../services/constants.service';
import { UsersService } from '../../../../services/users.service';
import { ConstantsInterface } from '../../../../interfaces/constants';
import { _const } from '../../../../commons/constants';

@Component({
  selector: 'nga-constants-settings',
  templateUrl: './constants.html',
  styleUrls: ['./constants.scss'],
})
export class ConstantsComponent implements OnInit {
  @ViewChild(SmartTablesComponent)
  private listFathers: Array<ConstantsInterface>;
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
      name: {
        title: 'Nombre',
        type: 'string',
      },
      father: {
        title: 'Padre',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
      },
      label: {
        title: 'Etiqueta',
        type: 'string',
      },
      value: {
        title: 'Valor',
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

  constructor(
    private _notificationsService: NotificationsService,
    private constantsService: ConstantsService,
    private usersService: UsersService,
  ) {
    this.user = (this.usersService.getCurrentUser()) ? this.usersService.getCurrentUser() : null;
  }

  public ngOnInit(): void {
    this.getAll();
    this.getListFathers();
  }

  private getAll(): void {
    this.constantsService.getAll()
      .subscribe(res => {
        if (res.success) {
          const data = new Array();

          if (res.data.length > 0) {
            res.data.forEach(element => {
              data.push({
                _id: element._id || null,
                name: element.name || null,
                father: (element.father) ? element.father.name : null,
                label: element.label || null,
                value: element.value || null,
                status: element.status.name || null,
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

  public getListFathers(): void {
    this.constantsService.getListFathers()
      .subscribe(res => {
        if (res.success) {
          this.settings.columns.father.editor.config.list = new Array();
          this.settings.columns.father.editor.config.list.push({ value: '', title: 'Selecciona una opción' });
          
          if (res.data.length > 0) {
            this.listFathers = res.data;

            res.data.forEach(element => {
              this.settings.columns.father.editor.config.list.push({
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
    const newData: ConstantsInterface = event.newData;
    const data: ConstantsInterface = Object.assign({}, event.newData); // clone object

    if (
      newData !== null &&
      newData !== undefined
    ) {
      if (
        newData.name !== null &&
        newData.name !== undefined &&
        newData.name !== ''
      ) {
        data['creator'] = (this.user) ? this.user._id : null;

        if (newData.status === 'active') {
          data.status = _const.status.active;
          newData.status = 'active';
        } else {
          data.status = _const.status.inactive;
          newData.status = 'inactive';
        }

        if (
          newData.father !== null &&
          newData.father !== undefined &&
          newData.father !== ''
        ) {
          data.father = this.listFathers.find(e => { return e.name === newData.father; })._id;
        }

        this.constantsService.create(data)
          .subscribe(res => {
            if (res.success) {
              event.confirm.resolve(newData);
              this.getListFathers();
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
          'El campo nombre es obligatorio.',
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
    const newData: ConstantsInterface = event.newData;
    const data: ConstantsInterface = Object.assign({}, event.newData); // clone object

    if (
      newData !== null &&
      newData !== undefined
    ) {
      if (
        newData.name !== null &&
        newData.name !== undefined &&
        newData.name !== ''
      ) {
        data['creator'] = (this.user) ? this.user._id : null;

        if (newData.status === 'active') {
          data.status = _const.status.active;
          newData.status = 'active';
        } else {
          data.status = _const.status.inactive;
          newData.status = 'inactive';
        }

        if (
          newData.father !== null &&
          newData.father !== undefined &&
          newData.father !== ''
        ) {
          data.father = this.listFathers.find(e => { return e.name === newData.father; })._id;
        }

        this.constantsService.update(data)
          .subscribe(res => {
            if (res.success) {
              event.confirm.resolve(newData);
              this.getListFathers();
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
          'El campo nombre es obligatorio.',
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
    const data: ConstantsInterface = event.data;

    if (
      data !== null &&
      data !== undefined
    ) {
      if (
        data.name !== null &&
        data.name !== undefined &&
        data.name !== ''
      ) {
        data['creator'] = (this.user) ? this.user._id : null;

        this.constantsService.delete(data)
          .subscribe(res => {
            if (res.success) {
              event.confirm.resolve();
              this.getListFathers();
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
          'El campo nombre es obligatorio.',
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
