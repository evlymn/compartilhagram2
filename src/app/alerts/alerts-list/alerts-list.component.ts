import {Component, Input, OnInit} from '@angular/core';
import {AlertsService} from "../alerts.service";

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent implements OnInit {
  @Input() isHome = false;
  alerts: any;

  constructor(public alertsService: AlertsService) {
    this.alertsService.auth.authState.subscribe(() => {
      this.getAlerts(this.isHome ? 4 : 30);
    })
  }


  getAlerts(limit: number) {
    this.alerts = this.alertsService.getAlerts(limit);
  }

  ngOnInit(): void {
    this.alertsService.setTotalToZero();
  }

}
