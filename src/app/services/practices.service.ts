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
export class PracticesService {
  readonly url = `${environment.api.baseUrl}/practices`;

  constructor(
    private http: Http,
    private _notificationsService: NotificationsService,
  ) { }

  public create(body): Observable<any> {
    return this.http
      .post(`${this.url}/id/${body.requestId}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getStockAvailable(body): Observable<any> {
    return this.http
      .get(`${this.url}/stock/${body.requestId}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getRequestApproved(body): Observable<any> {
    return this.http
      .get(
        `${this.url}/request/admin/${body.year}/${body.semesterId}/${body.laboratoryId}`,
        { headers: contentHeaders }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getUserRequestApproved(body): Observable<any> {
    return this.http
      .get(
        `${this.url}/request/user/${body.year}/${body.semesterId}`,
        { headers: contentHeaders }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getAllStudent(body): Observable<any> {
    return this.http
      .get(
        `${this.url}/users/${body.career}`,
        { headers: contentHeaders }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getAllRequestPractice(body): Observable<any> {
    return this.http
      .get(
        `${this.url}/reqprac/${body.year}/${body.semester}`,
        { headers: contentHeaders }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public getAllRequestPracticeByUser(body): Observable<any> {
    return this.http
      .get(
        `${this.url}/reqpracuser/${body.year}/${body.semester}`,
        { headers: contentHeaders }
      )
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public update(body): Observable<any> {
    return this.http
      .put(`${this.url}/id/${body._id}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public updateStatus(body): Observable<any> {
    return this.http
      .put(`${this.url}/status/id/${body._id}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError = (error: any): Observable<any> => {
    this._notificationsService.error('Transacción fallida');
    return Observable.throw(`Server error: ${error.json().error}` || 'Server error')
  }

}
