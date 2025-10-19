import { Component } from '@angular/core';
import { PollutionReportComponent } from './components/pollution-report/pollution-report.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PollutionReportComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Front';
}
