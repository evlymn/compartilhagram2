import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "../../shared/services/window/window.service";
import {FormDialogComponent} from "../timeline-form-dialog/form-dialog.component";
import FloatingMenuAnimations from "./floating-menu.animations";

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
              private _dialog: MatDialog,
              private _route: ActivatedRoute,
              private _router: Router) {
    this.urlFragment = this._route.snapshot.fragment;
  }

  scrollTo() {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
  }

  openForm() {
    const dialogRef = this._dialog.open(FormDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'bg-color',
      data: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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
