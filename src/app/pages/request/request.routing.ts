import { Routes, RouterModule } from '@angular/router';

import { RequestComponent } from './request.component';
import { RequestsComponent } from './components/requests/requests.component';
import { PracticesComponent } from './components/practices/practices.component';

const routes: Routes = [
  {
    path: '',
    component: RequestComponent,
    children: [
      { path: 'requests', component: RequestsComponent },
      { path: 'practices', component: PracticesComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);