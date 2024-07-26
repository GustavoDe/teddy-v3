import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { CardCsComponent } from './components/card-cs/card-cs.component';
import { ProposalHistoriesComponent } from './components/proposal-histories/proposal-historiescomponent';
@NgModule({
  declarations: [
    DashboardComponent,
    CardCsComponent,
    ProposalHistoriesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DashboardRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
