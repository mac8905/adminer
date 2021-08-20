import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TablesModule } from '../tables/tables.module';
import { SwitchComponent } from 'angular2-bootstrap-switch/components';

import { routing } from './settings.routing';

import { SettingsComponent } from './settings.component';
import { ConstantsComponent } from './components/constants/constants.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { RoutesComponent } from './components/routes/routes.component';
import { SmartTablesComponent } from './../tables/components/smartTables/smartTables.component';
import { UsersComponent } from './components/users/users.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { ProviderModalCreateComponent } from './components/providers/provider-modal-create/provider-modal-create.component';
import { ProviderModalEditComponent } from './components/providers/provider-modal-edit/provider-modal-edit.component';
import { ProviderModalDeleteComponent } from './components/providers/provider-modal-delete/provider-modal-delete.component';
import { CareersComponent } from './components/metrics/careers/careers.component';
import { LaboratoriesComponent } from './components/metrics/laboratories/laboratories.component';
import { PracticalTypesComponent } from './components/metrics/practical-types/practical-types.component';
import { DirectedPracticesComponent } from './components/metrics/directed-practices/directed-practices.component';
import { LocationsComponent } from './components/metrics/locations/locations.component';
import { CareerModalCreateComponent } from './components/metrics/careers/career-modal-create/career-modal-create.component';
import { CareerModalDeleteComponent } from './components/metrics/careers/career-modal-delete/career-modal-delete.component';
import { CareerModalEditComponent } from './components/metrics/careers/career-modal-edit/career-modal-edit.component';
import { DirectedPracticeModalCreateComponent } from './components/metrics/directed-practices/directed-practice-modal-create/directed-practice-modal-create.component';
import { DirectedPracticeModalDeleteComponent } from './components/metrics/directed-practices/directed-practice-modal-delete/directed-practice-modal-delete.component';
import { DirectedPracticeModalEditComponent } from './components/metrics/directed-practices/directed-practice-modal-edit/directed-practice-modal-edit.component';
import { LaboratoryModalCreateComponent } from './components/metrics/laboratories/laboratory-modal-create/laboratory-modal-create.component';
import { LaboratoryModalEditComponent } from './components/metrics/laboratories/laboratory-modal-edit/laboratory-modal-edit.component';
import { LaboratoryModalDeleteComponent } from './components/metrics/laboratories/laboratory-modal-delete/laboratory-modal-delete.component';
import { LocationModalCreateComponent } from './components/metrics/locations/location-modal-create/location-modal-create.component';
import { LocationModalDeleteComponent } from './components/metrics/locations/location-modal-delete/location-modal-delete.component';
import { LocationModalEditComponent } from './components/metrics/locations/location-modal-edit/location-modal-edit.component';
import { PracticalTypeModalCreateComponent } from './components/metrics/practical-types/practical-type-modal-create/practical-type-modal-create.component';
import { PracticalTypeModalDeleteComponent } from './components/metrics/practical-types/practical-type-modal-delete/practical-type-modal-delete.component';
import { PracticalTypeModalEditComponent } from './components/metrics/practical-types/practical-type-modal-edit/practical-type-modal-edit.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { SubjectModalCreateComponent } from './components/subjects/subject-modal-create/subject-modal-create.component';
import { SubjectModalDeleteComponent } from './components/subjects/subject-modal-delete/subject-modal-delete.component';
import { SubjectModalEditComponent } from './components/subjects/subject-modal-edit/subject-modal-edit.component';
import { ProfileModalCreateComponent } from './components/profiles/profile-modal-create/profile-modal-create.component';
import { ProfileModalDeleteComponent } from './components/profiles/profile-modal-delete/profile-modal-delete.component';
import { ProfileModalEditComponent } from './components/profiles/profile-modal-edit/profile-modal-edit.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { ScheduleModalCreateComponent } from './components/schedules/schedule-modal-create/schedule-modal-create.component';
import { ScheduleModalDeleteComponent } from './components/schedules/schedule-modal-delete/schedule-modal-delete.component';
import { ScheduleModalEditComponent } from './components/schedules/schedule-modal-edit/schedule-modal-edit.component';
import { TeachersComponent } from './components/metrics/teachers/teachers.component';
import { TeacherModalCreateComponent } from './components/metrics/teachers/teacher-modal-create/teacher-modal-create.component';
import { TeacherModalEditComponent } from './components/metrics/teachers/teacher-modal-edit/teacher-modal-edit.component';
import { TeacherModalDeleteComponent } from './components/metrics/teachers/teacher-modal-delete/teacher-modal-delete.component';

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
    SettingsComponent,
    ConstantsComponent,
    ProfilesComponent,
    RoutesComponent,
    UsersComponent,
    ProvidersComponent,
    ProviderModalCreateComponent,
    ProviderModalEditComponent,
    ProviderModalDeleteComponent,
    CareersComponent,
    LaboratoriesComponent,
    PracticalTypesComponent,
    DirectedPracticesComponent,
    LocationsComponent,
    CareerModalCreateComponent,
    CareerModalDeleteComponent,
    CareerModalEditComponent,
    DirectedPracticeModalCreateComponent,
    DirectedPracticeModalDeleteComponent,
    DirectedPracticeModalEditComponent,
    LaboratoryModalCreateComponent,
    LaboratoryModalEditComponent,
    LaboratoryModalDeleteComponent,
    LocationModalCreateComponent,
    LocationModalDeleteComponent,
    LocationModalEditComponent,
    PracticalTypeModalCreateComponent,
    PracticalTypeModalDeleteComponent,
    PracticalTypeModalEditComponent,
    SubjectsComponent,
    SubjectModalCreateComponent,
    SubjectModalDeleteComponent,
    SubjectModalEditComponent,
    SwitchComponent,
    ProfileModalCreateComponent,
    ProfileModalDeleteComponent,
    ProfileModalEditComponent,
    SchedulesComponent,
    ScheduleModalCreateComponent,
    ScheduleModalDeleteComponent,
    ScheduleModalEditComponent,
    TeachersComponent,
    TeacherModalCreateComponent,
    TeacherModalEditComponent,
    TeacherModalDeleteComponent,
  ],
  entryComponents: [
    ProviderModalCreateComponent,
    ProviderModalEditComponent,
    ProviderModalDeleteComponent,
    CareerModalCreateComponent,
    CareerModalDeleteComponent,
    CareerModalEditComponent,
    DirectedPracticeModalCreateComponent,
    DirectedPracticeModalDeleteComponent,
    DirectedPracticeModalEditComponent,
    LaboratoryModalCreateComponent,
    LaboratoryModalEditComponent,
    LaboratoryModalDeleteComponent,
    LocationModalCreateComponent,
    LocationModalDeleteComponent,
    LocationModalEditComponent,
    PracticalTypeModalCreateComponent,
    PracticalTypeModalDeleteComponent,
    PracticalTypeModalEditComponent,
    SubjectModalCreateComponent,
    SubjectModalDeleteComponent,
    SubjectModalEditComponent,
    ProfileModalCreateComponent,
    ProfileModalDeleteComponent,
    ProfileModalEditComponent,
    ScheduleModalCreateComponent,
    ScheduleModalDeleteComponent,
    ScheduleModalEditComponent,
    TeacherModalCreateComponent,
    TeacherModalEditComponent,
    TeacherModalDeleteComponent,
  ],
})
export class SettingsModule { }