import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {StorageService} from "../../services/firebase/storage/storage.service";

@Component({
  selector: 'app-editable-text-area',
  templateUrl: './editable-text-area.component.html',
  styleUrls: ['./editable-text-area.component.scss']
})
export class EditableTextAreaComponent implements AfterViewInit {
  @ViewChild('postTextElement') postTextElement!: ElementRef;
  @Output() onImagePasted = new EventEmitter();
  @Output() onTextChanged = new EventEmitter();
  @Input() postText = '';


  constructor(
    private _storageService: StorageService,) {
  }

  ngAfterViewInit(): void {
    this.postTextElement.nativeElement.addEventListener('paste', async (e: any) => {
      e.preventDefault();
      const clipboardItems = e.clipboardData.items;
      const images = [].slice.call(clipboardItems).filter((item: any) => item.type.indexOf('image') !== -1);
      if (images.length > 0) {
        const image = images[0] as any;
        const file = image.getAsFile();
        const image64 = await this._storageService.fileToBase64(file) as string;
        this.onImagePasted.emit({image64, file});
      } else {
        const plainText = e.clipboardData.getData('text/plain');
        const selection = window.getSelection();
        if (selection?.rangeCount) {
          selection.deleteFromDocument()
          selection.getRangeAt(0).insertNode(document.createTextNode(plainText))
        }
      }
    })

    this.postTextElement.nativeElement.addEventListener('keyup',  (e: any) => {
      this.onTextChanged.emit(e.target.innerHTML);
    })
  }
}
