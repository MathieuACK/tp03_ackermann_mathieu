import { Routes } from '@angular/router';
import { PollutionReportComponent } from './components/pollution-report/pollution-report.component';
import { PollutionListComponent } from './components/pollution-list/pollution-list.component';
import { PollutionDetailComponent } from './components/pollution-detail/pollution-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: PollutionListComponent },
  { path: 'report', component: PollutionReportComponent },
  { path: 'pollution/:id', component: PollutionDetailComponent },
  { path: '**', redirectTo: '/list' },
];
