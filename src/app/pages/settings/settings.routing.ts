import { Routes, RouterModule } from '@angular/router';

import { CareersComponent } from './components/metrics/careers/careers.component';
import { ConstantsComponent } from './components/constants/constants.component';
import { DirectedPracticesComponent } from './components/metrics/directed-practices/directed-practices.component';
import { LaboratoriesComponent } from './components/metrics/laboratories/laboratories.component';
import { LocationsComponent } from './components/metrics/locations/locations.component';
import { PracticalTypesComponent } from './components/metrics/practical-types/practical-types.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { RoutesComponent } from './components/routes/routes.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { SettingsComponent } from './settings.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TeachersComponent } from './components/metrics/teachers/teachers.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'constants', component: ConstantsComponent },
      { path: 'metrics/careers', component: CareersComponent },
      { path: 'metrics/teachers', component: TeachersComponent },
      { path: 'metrics/directed_practices', component: DirectedPracticesComponent },
      { path: 'metrics/laboratories', component: LaboratoriesComponent },
      { path: 'metrics/locations', component: LocationsComponent },
      { path: 'metrics/practical_types', component: PracticalTypesComponent },
      { path: 'profiles', component: ProfilesComponent },
      { path: 'providers', component: ProvidersComponent },
      { path: 'routes', component: RoutesComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'schedules', component: SchedulesComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);