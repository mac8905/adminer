import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';

import { AuthGuard } from '../guards/auth.guard';
import { Pages } from './pages.component';

import { ConstantsService } from '../services/constants.service';
import { ControlsService } from '../services/controls.service';
import { EntriesService } from '../services/entries.service';
import { MaintenancesService } from '../services/maintenances.service';
import { MetricsService } from '../services/metrics.service';
import { PracticesService } from '../services/practices.service';
import { ProfilesService } from '../services/profiles.service';
import { ProvidersService } from '../services/providers.service';
import { RequestsService } from '../services/requests.service';
import { RoutesService } from '../services/routes.service';
import { SchedulesService } from '../services/schedules.service';
import { StocksService } from '../services/stocks.service';
import { SubjectsService } from '../services/subjects.service';
import { TeachersService } from '../services/teachers.service';
import { TimeService } from '../services/time.service';
import { UsersService } from '../services/users.service';

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing,
  ],
  declarations: [
    Pages,
  ],
  providers: [
    AuthGuard,
    ConstantsService,
    ControlsService,
    EntriesService,
    MaintenancesService,
    MetricsService,
    PracticesService,
    ProfilesService,
    ProvidersService,
    RequestsService,
    RoutesService,
    SchedulesService,
    StocksService,
    SubjectsService,
    TeachersService,
    TimeService,
    UsersService,
    DatePipe,
  ],
  exports: [
  ],
  schemas: [
  ],
})
export class PagesModule {
}
