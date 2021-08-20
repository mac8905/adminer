import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'En espera',
        stats: '5',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Aprobados',
        stats: '10',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Cancelados',
        stats: '0',
        icon: 'person',
      }, {
        color: pieColor,
        description: 'Finalizados',
        stats: '8',
        icon: 'person',
      }
    ];
  }
}
