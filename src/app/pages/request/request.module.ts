import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesModule } from '../tables/tables.module';

import { routing } from './request.routing';

import { RequestComponent } from './request.component';
import { RequestsComponent } from './components/requests/requests.component';
import { PracticesComponent } from './components/practices/practices.component';
import { RequestModalOnWaitingComponent } from './components/requests/request-modal-on-waiting/request-modal-on-waiting.component';
import { PracticeModalOnWaitingComponent } from './components/practices/practice-modal-on-waiting/practice-modal-on-waiting.component';
import { PracticeModalInProcessComponent } from './components/practices/practice-modal-in-process/practice-modal-in-process.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    NgaModule,
    Ng2SmartTableModule,
    NgbModalModule,
    NgbModule,
    TablesModule,
  ],
  declarations: [
    RequestComponent,
    RequestsComponent,
    PracticesComponent,
    RequestModalOnWaitingComponent,
    PracticeModalOnWaitingComponent,
    PracticeModalInProcessComponent,
  ],
  entryComponents: [
    RequestModalOnWaitingComponent,
    PracticeModalOnWaitingComponent,
    PracticeModalInProcessComponent,
  ],
})
export class RequestModule { }
