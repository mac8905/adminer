import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { contentHeaders } from '../commons/headers';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { _const } from '../commons/constants';

@Injectable()
export class ConstantsService {
  readonly url = `${environment.api.baseUrl}/constants`;

  constructor(
    private http: Http,
    private _notificationsService: NotificationsService,
  ) { }

  public create(body): Observable<any> {
    return this.http
      .post(`${this.url}/`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public update(body): Observable<any> {
    return this.http
      .put(`${this.url}/${body.name}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public delete(body): Observable<any> {
    return this.http
      .delete(`${this.url}/${body.name}`, new RequestOptions({
        body,
        headers: contentHeaders
      }))
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getAll(): Observable<any> {
    return this.http
      .get(`${this.url}/`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getListFathers(): Observable<any> {
    return this.http
      .get(`${this.url}/fathers`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getByName(body): Observable<any> {
    return this.http
      .get(`${this.url}/${body.name}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getListByFather(body): Observable<any> {
    return this.http
      .get(`${this.url}/children/${body.father}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public filterStockStatus(list): any {
    return new Promise((resolve, reject) => {
      let newList = new Array();

      if (list.length > 0) {
        newList = list.filter(e => {
          switch (e._id) {
            case _const.status.available:
              return true;

            case _const.status.notavailable:
              return true;

            case _const.status.busy:
              return true;
          }
        });

        if (newList.length > 0) {
          resolve({success: true, data: newList});
        } else {
          reject({success: false, message: 'No hay registros'});
        }
      } else {
        reject({success: false, message: 'No hay registros'});
      }
    });
  }

  private handleError = (error: any): Observable<any> => {
    this._notificationsService.error('Transacción fallida');
    return Observable.throw(`Server error: ${error.json().error}` || 'Server error')
  }

}
