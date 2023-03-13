import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WindowService} from "../../shared/services/window/window.service";

@Component({
  selector: 'app-timeline-post-detail',
  templateUrl: './timeline-post-detail.component.html',
  styleUrls: ['./timeline-post-detail.component.scss']
})
export class TimelinePostDetailComponent implements OnInit, AfterViewInit {
  id = '';
  isMobile = this._windowService.sizes.isMobile;

  constructor(
    private _router: Router,
    private _windowService: WindowService,

  ) {
    this._windowService.getSizes.subscribe(s=> {

     this.isMobile = s.isMobile;
    })
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
    window.addEventListener('load', d => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
      })
    })
  }


}
