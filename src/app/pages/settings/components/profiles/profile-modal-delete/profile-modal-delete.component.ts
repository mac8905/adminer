import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';

import { ProfilesService } from '../../../../../services/profiles.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-profile-modal-delete',
  templateUrl: './profile-modal-delete.component.html',
  styleUrls: ['./profile-modal-delete.component.scss']
})
export class ProfileModalDeleteComponent implements OnInit {
  data: any;
  modalHeader: string;
  form: FormGroup;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private profilesService: ProfilesService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({});
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.profilesService.delete(this.data.data)
        .subscribe(res => {
          if (res.success) {
            this.source.remove(this.data);
            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitósa', res.message);
          } else {
            this._notificationsService.error('Transacción fallida', res.message);
            this.activeModal.close();
          }
        }, error => {
          this._notificationsService.error('Transacción fallida', error);
          this.activeModal.close();
        });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible eliminar el registro. Por favor intenta nuevamente.'
      );
      this.activeModal.close();
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
