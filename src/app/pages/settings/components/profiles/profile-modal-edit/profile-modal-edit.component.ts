import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { SwitchComponent } from 'angular2-bootstrap-switch/components';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { ProfilesService } from '../../../../../services/profiles.service';
import { RoutesService } from '../../../../../services/routes.service';
import { UsersService } from '../../../../../services/users.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-profile-modal-edit',
  templateUrl: './profile-modal-edit.component.html',
  styleUrls: ['./profile-modal-edit.component.scss']
})
export class ProfileModalEditComponent implements OnInit {
  data: any;
  formProfile: FormGroup;
  modalHeader: string;
  listRoutes: Array<any>;
  source: LocalDataSource;
  user: any;

  // checkbox
  status: boolean = false;
  onText: string = 'on';
  offText: string = 'off';
  onColor: string = 'green';
  offColor: string = 'red';
  size: string = 'mini';

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private profilesService: ProfilesService,
    private routesService: RoutesService,
    private usersService: UsersService,
  ) {
    this.user = this.usersService.getCurrentUser();
  }

  ngOnInit() {
    this.formProfile = this.fb.group({
      name: [(this.data.name) ? this.data.name : '', Validators.required],
      description: [(this.data.description) ? this.data.description : ''],
      routes: [(this.data.routes) ? this.data.routes : '', Validators.required],
      status: [''],
    });

    this.getAll();

    if (this.data.data.status._id === _const.status.active) {
      this.status = true;
    }
  }

  private getAll(): void {
    this.routesService.getAll()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listRoutes = res.data;
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

  onChange() {
    this.status = !this.status;
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.edit({ value, valid });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible guardar los cambios. Por favor intenta nuevamente.'
      );
    }
  }

  edit({ value, valid }: { value: any, valid: boolean }): void {
    const result = JSON.stringify(value);

    if (
      result !== null &&
      result !== undefined &&
      result !== ''
    ) {
      if (this.status) {
        value.status = _const.status.active;
      } else {
        value.status = _const.status.inactive;
      }

      value._id = (this.data.data) ? this.data.data._id : null;
      value.creator = this.user._id;

      this.profilesService.update(value)
        .subscribe(res => {
          if (res.success && res.data) {
            this.source.update(
              this.data,
              {
                data: res.data || null,
                name: value.name || null,
                description: value.description || null,
                routes: (res.data.routes) ? res.data.routes : null,
                status: (res.data.status) ? res.data.status.label : null,
              }
            );

            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitósa', res.message);
          } else {
            this._notificationsService.error('Transacción fallida', res.message);
          }
        }, error => {
          this._notificationsService.error('Transacción fallida', error);
        });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible guardar los cambios. Por favor intenta nuevamente.'
      );
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
