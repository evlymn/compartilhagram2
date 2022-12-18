import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../shared/services/window/window.service";
import FloatingMenuAnimations from "./floating-menu.animations";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {PostFormService} from "../../post-form/post-form.service";

@Component({
  selector: 'app-timeline-floating-menu',
  templateUrl: './timeline-floating-menu.component.html',
  styleUrls: ['./timeline-floating-menu.component.scss'],
  animations: [FloatingMenuAnimations]
})
export class TimelineFloatingMenuComponent implements OnInit, AfterViewInit {
  showScrollTo = false;
  isMobile = this.windowService.sizes.isMobile;
  urlFragment;
  actionsOpened = false;

  constructor(public windowService: WindowService,
              private _bottomSheet: MatBottomSheet,
              private _route: ActivatedRoute,
              private _router: Router,
              private _postFormService: PostFormService) {
    this.urlFragment = this._route.snapshot.fragment;
  }

  scrollTo() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }

  openForm(e: any, isSearch?: boolean) {
    this._postFormService.selectPanel(e, isSearch);
  }

  ngOnInit(): void {
    window.addEventListener('scroll', (d: any) => {
      this.showScrollTo = d.srcElement.scrollingElement?.scrollTop > 200;
    }, {capture: true})
  }

  ngAfterViewInit(): void {
    if (this.urlFragment) {
      this._router.navigate(['/principal'], {fragment: this.urlFragment}).catch();
    }
  }

  openActions() {
    this.actionsOpened = !this.actionsOpened;
  }

  routeToHome() {
    this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this._router.navigate(['/home']).catch();
    });
  }
}
