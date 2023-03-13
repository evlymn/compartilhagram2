import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {EditableTextAreaService} from "../editable-text-area.service";

@Component({
  selector: 'app-emoji-picker-dialog',
  templateUrl: './emoji-picker-dialog.component.html',
  styleUrls: ['./emoji-picker-dialog.component.scss']
})
export class EmojiPickerDialogComponent {

  i18n = {}

  constructor(
    public dialogRef: MatDialogRef<EmojiPickerDialogComponent>,
    private _service: EditableTextAreaService
  ) {
    this.i18n = this._service.emojiPickerTranslation();
  }

  addEmoji(e: any) {
    this.dialogRef.close(e.emoji.native);
  }
}
