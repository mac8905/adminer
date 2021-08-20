import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesModule } from '../tables/tables.module';

import { routing } from './stores.routing';

import { StoresComponent } from './stores.component';
import { EntriesComponent } from './components/entries/entries.component';
import { EntryModalCreateComponent } from './components/entries/entry-modal-create/entry-modal-create.component';
import { EntryModalEditComponent } from './components/entries/entry-modal-edit/entry-modal-edit.component';
import { EntryModalDeleteComponent } from './components/entries/entry-modal-delete/entry-modal-delete.component';
import { EntryDescriptionComponent } from './components/entries/entry-description/entry-description.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StockModalCreateComponent } from './components/stocks/stock-modal-create/stock-modal-create.component';
import { StockModalEditComponent } from './components/stocks/stock-modal-edit/stock-modal-edit.component';
import { StockModalDeleteComponent } from './components/stocks/stock-modal-delete/stock-modal-delete.component';

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
    StoresComponent,
    EntriesComponent,
    EntryModalCreateComponent,
    EntryModalEditComponent,
    EntryModalDeleteComponent,
    EntryDescriptionComponent,
    StocksComponent,
    StockModalCreateComponent,
    StockModalEditComponent,
    StockModalDeleteComponent,
  ],
  entryComponents: [
    EntryModalCreateComponent,
    EntryModalEditComponent,
    EntryModalDeleteComponent,
    StockModalCreateComponent,
    StockModalEditComponent,
    StockModalDeleteComponent,
  ],
})
export class StoresModule { }