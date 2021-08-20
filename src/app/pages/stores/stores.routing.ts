import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './stores.component';
import { EntriesComponent } from './components/entries/entries.component';
import { StocksComponent } from './components/stocks/stocks.component';

const routes: Routes = [
  {
    path: '',
    component: StoresComponent,
    children: [
      { path: 'entries', component: EntriesComponent },
      { path: 'stocks', component: StocksComponent },
    ],
  },
];

export const routing = RouterModule.forChild(routes);