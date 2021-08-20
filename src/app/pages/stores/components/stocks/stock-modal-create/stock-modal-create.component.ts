import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgUploaderOptions } from 'ngx-uploader';

import { ConstantsService } from '../../../../../services/constants.service';
import { MetricsService } from '../../../../../services/metrics.service';
import { NotificationsService } from 'angular2-notifications';
import { StocksService } from '../../../../../services/stocks.service';

import { _const } from '../../../../../commons/constants';

@Component({
  selector: 'nga-app-stock-modal-create',
  templateUrl: './stock-modal-create.component.html',
  styleUrls: ['./stock-modal-create.component.scss']
})
export class StockModalCreateComponent implements OnInit {
  defaultPicture = 'assets/img/theme/no-photo.png';

  uploaderOptions: NgUploaderOptions = {
    // url: 'http://website.com/upload'
    url: '',
    fieldName: 'photo',
  };

  formStock: FormGroup;
  listEntries: Array<any>;
  listLaboratories: Array<any>;
  listLocations: Array<any>;
  listProducts: Array<any>;
  listStatus: Array<any>;
  modalHeader: string;
  source: LocalDataSource;

  constructor(
    private activeModal: NgbActiveModal,
    private constantsService: ConstantsService,
    private fb: FormBuilder,
    private metricsService: MetricsService,
    private _notificationsService: NotificationsService,
    private stocksService: StocksService,
  ) { }

  ngOnInit() {
    this.formStock = this.fb.group({
      entry_id: ['', Validators.required],
      entry_val: ['', Validators.required],

      code: ['', Validators.required],
      succession: [''],
      trademark: [''],
      equipment: [''],
      model: [''],
      state: [''],

      laboratory_id: [''],
      location_id: [''],

      description: [''],
      photo: [''],
      handbook: [''],
      observations: [''],
      status: ['', Validators.required],

      characteristics: this.fb.group({
        power: [''],
        voltage: [''],
        kw: [''],
        amperage: [''],
      }),
    });

    this.getConstantsStatus({ father: _const.fathers.status });
    this.getEntriesMeansAvailable();
    this.getListMetrics({ type: 'location', label: 'ubicaciones' });
    this.getListMetrics({ type: 'laboratory', label: 'laboratorios' });
  }

  private getConstantsStatus(body): void {
    let message = '';

    this.constantsService.getListByFather(body)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.constantsService.filterStockStatus(res.data).then(response => {
              if (response.success) {
                this.listStatus = response.data;
              } else {
                this._notificationsService.error('Transacción fallida', response.message);
              }
            }).catch(error => {
              this._notificationsService.error('Transacción fallida', error.message);
            });
          } else {
            message = 'No hay estados, por favor dirígete al módulo de constantes';
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  private getEntriesMeansAvailable(): void {
    let message = '';

    this.stocksService.getEntriesMeansAvailable()
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listEntries = res.data;
          } else {
            message = 'No hay entradas, por favor dirígete al módulo de entradas';
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  private getListMetrics(type): void {
    let message = '';

    this.metricsService.getListMetrics(type)
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            switch (type.type) {
              case 'location':
                this.listLocations = res.data;
                break;

              case 'laboratory':
                this.listLaboratories = res.data;
                break;

              default:
                message = `Error en parametrización. Por favor contáctate con el administrador del sistema`;
                this._notificationsService.error('Transacción fallida', message);
                break;
            }
          } else {
            message = `No hay ${type.label}, por favor ve al módulo de configuración de métricas`;
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  setListProducts(event) {
    let message = '';

    this.stocksService.getMeansStockByEntry({ _id: event })
      .subscribe(res => {
        if (res.success) {
          if (res.data.length > 0) {
            this.listProducts = res.data;
          } else {
            message = 'No hay recursos, por favor dirígete al módulo de entradas';
            this._notificationsService.error('Transacción fallida', message);
          }
        } else {
          message = res.message;
          this._notificationsService.error('Transacción fallida', message);
        }
      }, error => {
        message = error;
        this._notificationsService.error('Transacción fallida', message);
      });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.add({ value, valid });
    } else {
      this._notificationsService.error(
        'Transacción fallida',
        'No fue posible guardar los cambios. Por favor intenta nuevamente.'
      );
    }
  }

  add({ value, valid }: { value: any, valid: boolean }): void {
    const result = JSON.stringify(value);

    if (
      result !== null &&
      result !== undefined &&
      result !== ''
    ) {
      this.stocksService.create(value)
        .subscribe(res => {
          let status = null;
          
          if (res.success && res.data) {
            if (res.data.status && res.data.status._id === _const.status.available) {
              status = `<b class="text-success">${res.data.status.label}</b>`;
            } else if (res.data.status && res.data.status._id === _const.status.notavailable) {
              status = `<b class="text-danger">${res.data.status.label}</b>`;
            } else if (res.data.status && res.data.status._id === _const.status.busy) {
              status = `<b class="text-warning">${res.data.status.label}</b>`;
            }
            
            this.source.add({
              data: res.data,
              invoice: (res.data.entry_id) ? res.data.entry_id.invoice : null,
              code: res.data.code || null,
              succession: res.data.succession || null,
              trademark: res.data.trademark || null,
              equipment: res.data.equipment || null,
              model: res.data.model || null,
              status: (res.data.status) ? status : null,
            });

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

  private getDatetime(date: any, time: any): any {
    return new Date(`${date.year}-${date.month}-${date.day} ${time.hour}:${time.minute}:00`);
  }

}
