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

@Injectable()
export class SchedulesService {
  readonly url = `${environment.api.baseUrl}/schedules`;

  constructor(
    private http: Http,
    private _notificationsService: NotificationsService,
  ) { }

  public getAll(): Observable<any> {
    return this.http
      .get(`${this.url}/`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getId(body): Observable<any> {
    return this.http
      .get(`${this.url}/${body._id}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getSchedulesAvailable(body): Observable<any> {
    return this.http
      .post(`${this.url}/availables`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public create(body): Observable<any> {
    return this.http
      .post(`${this.url}/`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public update(body): Observable<any> {
    return this.http
      .put(`${this.url}/${body._id}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public delete(body): Observable<any> {
    return this.http
      .delete(`${this.url}/${body._id}`, new RequestOptions({
        body,
        headers: contentHeaders,
      }))
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError = (error: any): Observable<any> => {
    this._notificationsService.error('Transacción fallida');
    return Observable.throw(`Server error: ${error.json().error}` || 'Server error')
  }

}
