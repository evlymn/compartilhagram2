import {Component, OnInit} from '@angular/core';
import {AlertsService} from "../alerts.service";

@Component({
  selector: 'app-alerts-list',
  templateUrl: './alerts-list.component.html',
  styleUrls: ['./alerts-list.component.scss']
})
export class AlertsListComponent implements OnInit {
  alerts: any;

  constructor(public alertsService: AlertsService) {
    this.alertsService.auth.authState.subscribe(() => {
      this.getAlerts();
    })
  }


  getAlerts() {
    this.alerts = this.alertsService.getAlerts();
  }

  ngOnInit(): void {
    this.alertsService.setTotalToZero();
  }

}
