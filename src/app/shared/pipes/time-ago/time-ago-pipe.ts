import {ChangeDetectorRef, NgZone, OnDestroy, Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoPipe implements PipeTransform, OnDestroy {

  private timer: number | null | undefined;

  host = 'en';

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {
    this.host = window.location.host == 'exchangeagram.app' ? 'en' : 'pt';
  }

  transform(value: string) {
    this.removeTimer();
    let d = new Date(value);
    let now = new Date();
    let seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    let timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    let minutes = Math.round(Math.abs(seconds / 60));
    let hours = Math.round(Math.abs(minutes / 60));
    let days = Math.round(Math.abs(hours / 24));
    let months = Math.round(Math.abs(days / 30.416));
    let years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return '';
    } else if (seconds <= 45) {
      return this.host == 'pt' ? '<1min' : 'a few seconds';
    } else if (seconds <= 90) {
      return '1min';
    } else if (minutes <= 45) {
      return minutes + 'min';
    } else if (minutes <= 90) {
      return this.host == 'pt' ? '1 hora' : '1 hour';
    } else if (hours <= 22) {
      return  this.host == 'pt' ? hours + ' horas' : hours + ' hours';
    } else if (hours <= 36) {
      return this.host == 'pt' ? '1 dia' : '1 day';
    } else if (days <= 25) {
      return this.host == 'pt' ? days + ' dias' : days + ' days';
    } else if (days <= 45) {
      return this.host == 'pt' ? '1 mês' : '1 month';
    } else if (days <= 345) {
      return this.host == 'pt' ? months + ' meses' : months + ' months';
    } else if (days <= 545) {
      return this.host == 'pt' ? '1 ano' : '1 year';
    } else { // (days > 545)
      return this.host == 'pt' ? years + ' anos' : years + ' years';
    }
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number) {
    let min = 60;
    let hr = min * 60;
    let day = hr * 24;
    if (seconds < min) { // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) { // less then a day, update every 5 mins
      return 300;
    } else { // update every hour
      return 3600;
    }
  }
}
