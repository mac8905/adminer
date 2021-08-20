import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesModule } from '../tables/tables.module';

import { routing } from './maintenance.routing';

import { MaintenanceComponent } from './maintenance.component';
import { CorrectivesComponent } from './components/correctives/correctives.component';
import { PreventivesComponent } from './components/preventives/preventives.component';
import { ControlsComponent } from './components/controls/controls.component';
import { CorrectiveModalCreateComponent } from './components/correctives/corrective-modal-create/corrective-modal-create.component';
import { CorrectiveModalDeleteComponent } from './components/correctives/corrective-modal-delete/corrective-modal-delete.component';
import { CorrectiveModalEditComponent } from './components/correctives/corrective-modal-edit/corrective-modal-edit.component';
import { PreventiveModalCreateComponent } from './components/preventives/preventive-modal-create/preventive-modal-create.component';
import { PreventiveModalDeleteComponent } from './components/preventives/preventive-modal-delete/preventive-modal-delete.component';
import { PreventiveModalEditComponent } from './components/preventives/preventive-modal-edit/preventive-modal-edit.component';
import { ControlModalCreateComponent } from './components/controls/control-modal-create/control-modal-create.component';
import { ControlModalDeleteComponent } from './components/controls/control-modal-delete/control-modal-delete.component';
import { ControlModalEditComponent } from './components/controls/control-modal-edit/control-modal-edit.component';

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
    MaintenanceComponent,
    CorrectivesComponent,
    PreventivesComponent,
    ControlsComponent,
    CorrectiveModalCreateComponent,
    CorrectiveModalDeleteComponent,
    CorrectiveModalEditComponent,
    PreventiveModalCreateComponent,
    PreventiveModalDeleteComponent,
    PreventiveModalEditComponent,
    ControlModalCreateComponent,
    ControlModalDeleteComponent,
    ControlModalEditComponent,
  ],
  entryComponents: [
    CorrectiveModalCreateComponent,
    CorrectiveModalDeleteComponent,
    CorrectiveModalEditComponent,
    PreventiveModalCreateComponent,
    PreventiveModalDeleteComponent,
    PreventiveModalEditComponent,
    ControlModalCreateComponent,
    ControlModalDeleteComponent,
    ControlModalEditComponent,
  ],
})
export class MaintenanceModule { }
