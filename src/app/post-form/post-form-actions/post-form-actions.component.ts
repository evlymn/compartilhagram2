import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PostFormService} from "../post-form.service";

@Component({
  selector: 'app-post-form-actions',
  templateUrl: './post-form-actions.component.html',
  styleUrls: ['./post-form-actions.component.scss']
})
export class PostFormActionsComponent {

  @Output() onSave = new EventEmitter();
  @Output() onSearch = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Input() panelPost = false;
  @Input() sendingPost = false;
  @Input() panelSearch = false;
  @Input() disableSabeButton = false;

  constructor(public postFormService: PostFormService,) {
  }

  savePost() {
    this.onSave.emit();
  }
  searchUser() {
    this.onSearch.emit();
  }
  cancel() {
    this.onCancel.emit();
  }
}
