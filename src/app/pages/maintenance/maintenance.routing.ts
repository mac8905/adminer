import { Routes, RouterModule } from '@angular/router';

import { MaintenanceComponent } from './maintenance.component';
import { CorrectivesComponent } from './components/correctives/correctives.component';
import { PreventivesComponent } from './components/preventives/preventives.component';
import { ControlsComponent } from './components/controls/controls.component';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
    children: [
      { path: 'correctives', component: CorrectivesComponent },
      { path: 'preventives', component: PreventivesComponent },
      { path: 'controls', component: ControlsComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);