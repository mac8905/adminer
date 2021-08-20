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
export class RequestsService {
  readonly url = `${environment.api.baseUrl}/requests`;

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

  public updateState(body): Observable<any> {
    return this.http
      .put(`${this.url}/requestid/${body._id}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getAllSemester(body): Observable<any> {
    return this.http
      .get(`${this.url}/semester/${body.semester}/${body.year}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getDateAvailable(body): Observable<any> {
    return this.http
      .get(`${this.url}/days/${body.date}/${body.laboratoryId}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getDateLaboratory(body): Observable<any> {
    return this.http
      .get(`${this.url}/date/${body.date}/${body.laboratoryId}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getRequestByUser(body): Observable<any> {
    return this.http
      .get(
      `${this.url}/user/${body.year}/${body.semester}/${body.laboratoryId}`,
      { headers: contentHeaders }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getReqByConsecutive(body): Observable<any> {
    return this.http
      .get(`${this.url}/consecutive/${body.consecutiveCod}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getReqAutPresent(): Observable<any> {
    return this.http
      .get(`${this.url}/all/present`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError = (error: any): Observable<any> => {
    this._notificationsService.error('Transacción fallida');
    return Observable.throw(`Server error: ${error.json().error}` || 'Server error')
  }

}
