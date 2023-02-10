import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-timeline-post-detail',
  templateUrl: './timeline-post-detail.component.html',
  styleUrls: ['./timeline-post-detail.component.scss']
})
export class TimelinePostDetailComponent implements OnInit, AfterViewInit {
  // @ViewChild('toTopButton') toTopButton!: ElementRef;
  id = '';

  constructor(private _router: Router) {
  }

  ngOnInit(): void {

    window.addEventListener('load', d => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    })
  }

  ngAfterViewInit(): void {
    this._router.navigate(['details', this.id], {fragment: 'post'}).catch()

    // this.toTopButton.nativeElement.click();
    window.addEventListener('load', d => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    })
  }

  commentChanged($event: any) {

  }
}
