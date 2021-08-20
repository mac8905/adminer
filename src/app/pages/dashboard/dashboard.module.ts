import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing } from './dashboard.routing';

import { LimitToPipe } from '../../pipes/limit-to.pipe';

import { PieChart } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
  ],
  declarations: [
    PieChart,
    Dashboard,
    ScheduleComponent,
    LimitToPipe,
  ],
  providers: [
    PieChartService,
  ],
})
export class DashboardModule { }
