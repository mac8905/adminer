import { Users } from '../models/users';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { contentHeaders } from '../commons/headers';
import { AuthGuard } from 'app/guards/auth.guard';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UsersService {
  readonly url = `${environment.api.baseUrl}/users`;
  private authUser: any;

  constructor(
    private http: Http,
    private _notificationsService: NotificationsService,
  ) {
    if (
      localStorage.getItem('authUser') !== null &&
      localStorage.getItem('authUser') !== undefined &&
      localStorage.getItem('authUser') !== ''
    ) {
      this.authUser = JSON.parse(localStorage.getItem('authUser'));

      contentHeaders.append(
        'Authorization',
        `Bearer ${this.getCurrentToken()}`,
      );
    }
  }

  public getCurrentUser(): any {
    const user: any = this.authUser.user;

    if (
      user !== null &&
      user !== undefined &&
      user !== ''
    ) {
      return user;
    }

    return null;
  }

  public getCurrentToken(): string {
    const token: any = this.authUser.token;

    if (
      token !== null &&
      token !== undefined &&
      token !== ''
    ) {
      return token;
    }

    return null;
  }

  public singIn(user: Users): Observable<any> {
    return this.http
      .post(`${this.url}/signin`, JSON.stringify(user), { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public forgot(username: string): Observable<any> {
    return this.http
      .post(`${this.url}/forgot`, JSON.stringify({ username }), { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public isAuthenticated(): any {
    if (localStorage.getItem('authUser') !== null) {
      return JSON.parse(localStorage.getItem('authUser'));
    } else {
      return false;
    }
  }

  public create(body): Observable<any> {
    return this.http
      .post(`${this.url}/`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public update(body): Observable<any> {
    return this.http
      .put(`${this.url}/${body.username}`, body, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  public delete(body): Observable<any> {
    return this.http
      .delete(`${this.url}/${body.username}`, new RequestOptions({
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

  public getByProfile(id: string): Observable<any> {
    return this.http
      .get(`${this.url}/profile/${id}`, { headers: contentHeaders })
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  private handleError = (error: any): Observable<any> => {
    this._notificationsService.error('Transacción fallida');
    return Observable.throw(error.json().error || 'Server error')
  }

}
