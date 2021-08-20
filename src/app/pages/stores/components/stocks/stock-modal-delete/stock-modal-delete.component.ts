import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { NotificationsService } from 'angular2-notifications';
import { StocksService } from '../../../../../services/stocks.service';

@Component({
  selector: 'nga-app-stock-modal-delete',
  templateUrl: './stock-modal-delete.component.html',
  styleUrls: ['./stock-modal-delete.component.scss']
})
export class StockModalDeleteComponent implements OnInit {
  data: any;
  modalHeader: string;
  formStock: FormGroup;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private stocksService: StocksService,
  ) { }

  ngOnInit() {
    this.formStock = this.fb.group({});
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.stocksService.delete(this.data.data)
        .subscribe(res => {
          if (res.success) {
            this.source.remove(this.data);
            this.source.refresh();
            this.activeModal.close();
            this._notificationsService.success('Transacción exitósa', res.message);
          } else {
            this._notificationsService.error('Transacción fallida', res.message);
          }
        }, error => {
          this._notificationsService.error('Transacción fallida', error);
        });

      this.source.remove(this.data);
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible eliminar el registro. Por favor intenta nuevamente.'
      );
    }
  }

  closeModal() {
    this.activeModal.close();
  }

}
